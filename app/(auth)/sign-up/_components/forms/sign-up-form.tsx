'use client'

import { useTransition } from 'react'

import Link from 'next/link'

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
} from '../../../../../components/ui/form'
import { Input } from '../../../../../components/ui/input'
import { Button } from '../../../../../components/ui/button'

import { SignUpSchema } from '@/schemas'

import { signUp } from '@/app/(auth)/sign-up/_server/actions/sign-up'
import { PasswordInput } from '@/components/password-input'
import { Icons } from '@/components/icons'

export const SignUpForm = () => {
	const [loading, startTransition] = useTransition()

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
						toast.error('Failed to sign in.', {
							description: 'Please try again later',
						})
						break
				}
			})
		})
	}

	return (
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
								<FormLabel htmlFor={field.name}>Name</FormLabel>
								<FormControl>
									<Input
										id={field.name}
										disabled={loading}
										autoComplete="name"
										type="text"
										placeholder="Rodney Mullen"
										className="hover:bg-muted"
										{...field}
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
								<FormLabel htmlFor={field.name}>Email</FormLabel>
								<FormControl>
									<Input
										id={field.name}
										disabled={loading}
										autoComplete="email"
										type="text"
										placeholder="rodneymullen180@gmail.com"
										className="hover:bg-muted"
										{...field}
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
								<div className="flex items-center">
									<FormLabel htmlFor={field.name}>Password</FormLabel>
									<Link
										href="/forgot-password"
										className="ml-auto inline-block text-sm underline"
									>
										Forgot your password?
									</Link>
								</div>
								<FormControl>
									<PasswordInput
										disabled={loading}
										placeholder="**********"
										autoComplete="current-password"
										id={field.name}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button
					disabled={loading}
					type="submit"
					className="w-full"
				>
					{loading ? (
						<Icons.spinner
							className="animate-spin h-4 w-4"
							aria-hidden="true"
						/>
					) : (
						'Sign Up'
					)}
				</Button>
			</form>
		</Form>
	)
}
