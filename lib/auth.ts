import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/lib/db'
import { NextAuthOptions } from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  session: {
    strategy: 'jwt',
    maxAge: 20 * 60, // 20 minutes session timeout
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        emailOrPhone: { label: 'Email or Phone', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.emailOrPhone || !credentials?.password) {
          return null
        }

        // Check if input is email or phone number
        const isEmail = credentials.emailOrPhone.includes('@')
        
        // Find user by email or phone number
        const user = await db.user.findFirst({
          where: isEmail 
            ? { email: credentials.emailOrPhone }
            : { phone: credentials.emailOrPhone },
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return user
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token && session.user) {
        session.user.id = token.id
        session.user.role = token.role
      }

      return session
    },
    async jwt({ token, user }) {
      if (!token.email) {
        return token
      }

      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.fullName,
        email: dbUser.email,
        role: dbUser.role,
        picture: null,
      }
    },
  },
  events: {
    async signOut() {
      // Additional cleanup on signout if needed
      console.log('User signed out - session expired or manual logout')
    },
  },
} 