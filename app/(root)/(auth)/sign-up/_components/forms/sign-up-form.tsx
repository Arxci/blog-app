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
} from '../../../../../../components/ui/form'
import { Input } from '../../../../../../components/ui/input'
import { Button } from '../../../../../../components/ui/button'

import { AuthCardWrapper } from '../../../../../../components/auth/auth-card-wrapper'
import { FormError } from '../../../../../../components/form-error'

import { SignUpSchema } from '@/schemas'

import { signUp } from '@/app/(root)/(auth)/sign-up/_server/actions/sign-up'

export const SignUpForm = () => {
	const [isPending, startTransition] = useTransition()

	const form = useForm<z.infer<typeof SignUpSchema>>({
		resolver: zodResolver(SignUpSchema),
		defaultValues: {
			email: '',
			password: '',
			name: '',
		},
	})

	const handleSubmit = (values: z.infer<typeof SignUpSchema>) => {
		startTransition(() => {
			signUp(values).then((data) => {
				switch (data.type) {
					case 'error':
						toast.error('Failed to create an account.', { ...data })
						break
					case 'success':
						toast.success('Check your email', { ...data })
						break
					default:
						toast.success('Failed to sign in.', {
							description: 'Please try again later',
						})
						break
				}
			})
		})
	}

	return (
		<AuthCardWrapper
			headerLabel="Create an account"
			backButtonHref="/sign-in"
			backButtonLabel="Already have an account?"
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
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											{...field}
											disabled={isPending}
											placeholder="John Doe"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
						Sign up
					</Button>
				</form>
			</Form>
		</AuthCardWrapper>
	)
}