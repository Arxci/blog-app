'use client'

import { useTransition } from 'react'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

import { AuthCardWrapper } from '../auth/auth-card-wrapper'
import { FormError } from '../form-error'

import { SignInSchema } from '@/schemas'

import { signIn } from '@/actions/sign-in'

export const SignInForm = () => {
	const [isPending, startTransition] = useTransition()

	const form = useForm<z.infer<typeof SignInSchema>>({
		resolver: zodResolver(SignInSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const handleSubmit = (values: z.infer<typeof SignInSchema>) => {
		startTransition(async () => {
			signIn(values).then((data) => {
				if (data?.type === 'error') {
					const { description } = data

					if (description) {
						toast.error('Failed to sign in.', { description })
					}
				}
			})
		})
	}

	return (
		<AuthCardWrapper
			headerLabel="Welcome back"
			backButtonHref="/sign-up"
			backButtonLabel="Don't have an account?"
			showSocial
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleSubmit)}
					className="space-y-6"
				>
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											placeholder="john.doe@example.com"
											type="email"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											placeholder="******"
											type="password"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError />
					<Button
						disabled={isPending}
						type="submit"
						className="w-full"
					>
						Sign in
					</Button>
				</form>
			</Form>
		</AuthCardWrapper>
	)
}
