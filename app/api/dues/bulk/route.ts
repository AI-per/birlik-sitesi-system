import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'
import { getCurrentUser } from '@/lib/session'
import { Role } from '@prisma/client'

const bulkCreateDueSchema = z.object({
  amount: z.number().positive(),
  month: z.number().min(1).max(12),
  year: z.number().min(new Date().getFullYear()),
  dueDate: z.string().transform((str: string) => new Date(str)),
  blockId: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser()

    if (!user || (user.role !== Role.ADMIN && user.role !== Role.MANAGER)) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const json = await req.json()
    const body = bulkCreateDueSchema.parse(json)

    const whereClause: any = {}
    if (body.blockId) {
      whereClause.blockId = body.blockId
    }

    const apartments = await db.apartment.findMany({
      where: whereClause,
      select: { id: true },
    })

    if (!apartments || apartments.length === 0) {
      return new NextResponse('No apartments found', { status: 404 })
    }

    const dueCreationPromises = apartments.map((apartment: { id: string }) => {
      return db.due.create({
        data: {
          apartmentId: apartment.id,
          amount: body.amount,
          month: body.month,
          year: body.year,
          dueDate: body.dueDate,
        },
      })
    })

    await db.$transaction(dueCreationPromises)

    const blockName = body.blockId 
      ? (await db.block.findUnique({ where: { id: body.blockId } }))?.name || 'Seçilen blok'
      : 'Tüm bloklar'

    return new NextResponse(`${apartments.length} daire için ${blockName} aidatları başarıyla oluşturuldu`, { status: 201 })
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 })
    }

    console.error('[BULK_CREATE_DUE]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 