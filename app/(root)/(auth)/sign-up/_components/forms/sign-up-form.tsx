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
} from '../../../../../../components/ui/form'
import { Input } from '../../../../../../components/ui/input'
import { Button } from '../../../../../../components/ui/button'

import { FormError } from '../../../../../../components/form-error'

import { SignUpSchema } from '@/schemas'

import { signUp } from '@/app/(root)/(auth)/sign-up/_server/actions/sign-up'
import { PasswordInput } from '@/components/password-input'

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
	)
}
