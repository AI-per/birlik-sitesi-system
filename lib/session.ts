import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function getSession() {
  return await getServerSession(authOptions)
}

export async function getCurrentUser() {
  const session = await getSession()

  if (!session?.user?.email) {
    return null
  }

  const user = await db.user.findUnique({
    where: {
      email: session.user.email,
    },
  })

  if (!user) {
    return null
  }

  return user
} 