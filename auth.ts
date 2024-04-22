import NextAuth from 'next-auth'

import { PrismaAdapter } from '@auth/prisma-adapter'

import { getUserById } from './lib/user'
import prismaDB from './lib/prisma'

import authConfig from './auth.config'

export const { handlers, auth, signIn, signOut } = NextAuth({
	pages: {
		signIn: '/sign-in',
		error: '/error',
	},
	events: {
		async linkAccount({ user }) {
			await prismaDB.user.update({
				where: { id: user.id },
				data: { emailVerified: new Date() },
			})
		},
	},
	callbacks: {
		async signIn({ user }) {
			return true

			const existingUser = await getUserById(user.id || '')

			if (!existingUser || !existingUser?.emailVerified) return false

			return true
		},
		async jwt({ token }) {
			if (!token.sub) return token

			const existingUser = await getUserById(token.sub)

			if (!existingUser) return token

			token.role = existingUser.role

			return token
		},
		async session({ token, session }) {
			if (token.sub && session.user) {
				session.user.id = token.sub
			}

			if (token.role && session.user) {
				session.user.role = token.role
			}

			return session
		},
	},
	adapter: PrismaAdapter(prismaDB),
	session: { strategy: 'jwt' },
	...authConfig,
})
