'use server'

import { AuthError } from 'next-auth'
import * as z from 'zod'

import { signIn as authSignIn } from '@/auth'
import { DEFAULT_SIGNIN_REDIRECT } from '@/routes'

import { SignInSchema } from '@/schemas'

export const signIn = async (values: z.infer<typeof SignInSchema>) => {
	const validatedFields = SignInSchema.safeParse(values)

	if (!validatedFields.success) {
		return { type: 'error', description: 'Invalid fields!' }
	}

	const { email, password } = validatedFields.data

	try {
		await authSignIn('credentials', {
			email,
			password,
			redirectTo: DEFAULT_SIGNIN_REDIRECT,
		})
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { type: 'error', description: 'Invalid credentials.' }
				default:
					return { type: 'error', description: 'Something went wrong.' }
			}
		}

		throw error
	}
}
