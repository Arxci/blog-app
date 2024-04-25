'use server'

import * as z from 'zod'
import bcrypt from 'bcryptjs'

import { SignUpSchema } from '@/schemas'
import { getUserByEmail } from '@/lib/user'

export const signUp = async (values: z.infer<typeof SignUpSchema>) => {
	const validatedFields = SignUpSchema.safeParse(values)

	if (!validatedFields.success) {
		return { error: 'Invalid fields!' }
	}

	const { password, name, email } = validatedFields.data

	const hashedPassword = await bcrypt.hash(password, 10)

	const existingUser = await getUserByEmail(email)

	if (existingUser) {
		return { type: 'error', description: 'Email is already taken.' }
	}

	await prisma?.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	})

	// TODO: Send verification token email

	return { type: 'success', description: 'User has been created,' }
}
