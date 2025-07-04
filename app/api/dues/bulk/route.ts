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

    // Build where clause for apartment filtering
    const whereClause: any = {}
    if (body.blockId && body.blockId !== "all") {
      whereClause.blockId = body.blockId
    }

    console.log('Bulk dues creation - whereClause:', whereClause)

    // Fetch apartments with all necessary relations
    const apartments = await db.apartment.findMany({
      where: whereClause,
      select: { 
        id: true,
        number: true,
        block: {
          select: {
            id: true,
            name: true
          }
        }
      },
    })

    console.log(`Found ${apartments.length} apartments for bulk dues creation`)

    if (!apartments || apartments.length === 0) {
      return new NextResponse('No apartments found', { status: 404 })
    }

    // Check for existing dues to prevent duplicates
    const existingDues = await db.due.findMany({
      where: {
        apartmentId: { in: apartments.map(apt => apt.id) },
        month: body.month,
        year: body.year,
        isAutomaticDue: true
      },
      select: { apartmentId: true }
    })

    const existingApartmentIds = new Set(existingDues.map(due => due.apartmentId))
    const apartmentsToProcess = apartments.filter(apt => !existingApartmentIds.has(apt.id))

    console.log(`${apartmentsToProcess.length} apartments need new dues (${existingDues.length} already have dues for this period)`)

    if (apartmentsToProcess.length === 0) {
      return new NextResponse('All apartments already have dues for this period', { status: 400 })
    }

    // Create dues
    const dueCreationPromises = apartmentsToProcess.map((apartment: any) => {
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

    const createdDues = await db.$transaction(dueCreationPromises)

    // Determine block name for response
    const blockName = body.blockId && body.blockId !== "all" 
      ? apartments[0]?.block?.name || 'Seçilen blok'
      : 'Tüm bloklar'

    console.log(`Successfully created ${createdDues.length} dues for ${blockName}`)

    return new NextResponse(`${apartmentsToProcess.length} daire için ${blockName} aidatları başarıyla oluşturuldu`, { status: 201 })
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.issues)
      return new NextResponse(JSON.stringify(error.issues), { status: 422 })
    }

    console.error('[BULK_CREATE_DUE]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 