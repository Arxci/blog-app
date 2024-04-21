'use server'

import { SignInSchema } from '@/schemas'
import * as z from 'zod'

export const signIn = async (values: z.infer<typeof SignInSchema>) => {
	const validatedFields = SignInSchema.safeParse(values)

	if (!validatedFields.success) {
		return { error: 'Invalid fields!' }
	}

	return { success: 'Email sent!' }
}
