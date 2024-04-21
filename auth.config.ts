import { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import bcrypt from 'bcryptjs'

import { SignInSchema } from './schemas'
import { getUserByEmail } from './lib/user'

export default {
	providers: [
		Credentials({
			//@ts-ignore
			async authorize(credentials) {
				const validatedFields = SignInSchema.safeParse(credentials)

				if (validatedFields.success) {
					const { email, password } = validatedFields.data

					const user = await getUserByEmail(email)

					if (!user || !user.password) return null

					const passwordsMatch = await bcrypt.compare(password, user.password)

					if (passwordsMatch) return user

					return null
				}
			},
		}),
	],
} satisfies NextAuthConfig
