import NextAuth from 'next-auth'

import { PrismaAdapter } from '@auth/prisma-adapter'

import prismaDB from './lib/prisma'
import authConfig from './auth.config'

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	adapter: PrismaAdapter(prismaDB),
	session: { strategy: 'jwt' },
	...authConfig,
})
