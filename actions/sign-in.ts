'use server'

import { AuthError } from 'next-auth'

import { signIn as authSignIn } from '@/auth'
import { DEFAULT_SIGNIN_REDIRECT } from '@/routes'

import { SignInSchema } from '@/schemas'
import * as z from 'zod'

export const signIn = async (values: z.infer<typeof SignInSchema>) => {
	const validatedFields = SignInSchema.safeParse(values)

	if (!validatedFields.success) {
		return { error: 'Invalid fields!' }
	}

	const { email, password } = validatedFields.data

	try {
		authSignIn('credentials', {
			email,
			password,
			redirectTo: DEFAULT_SIGNIN_REDIRECT,
		})
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return { error: 'Invalid credentials.' }
				default:
					return { error: 'Something went wrong.' }
			}
		}

		throw error
	}
}
