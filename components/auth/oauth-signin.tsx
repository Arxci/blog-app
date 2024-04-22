'use client'

import { useEffect, useState } from 'react'

import { signIn } from 'next-auth/react'

import { toast } from 'sonner'

import { Icons } from '../icons'
import { Button } from '../ui/button'

import { DEFAULT_SIGNIN_REDIRECT } from '@/routes'
import { useSearchParams } from 'next/navigation'
import { handleOAuthError } from '@/lib/utils'

export const OAuthSignIn = () => {
	const [isLoading, setIsLoading] = useState<'google' | 'github' | null>(null)
	const searchParams = useSearchParams()

	const handleClick = (provider: 'google' | 'github') => {
		setIsLoading(provider)

		signIn(provider, {
			callbackUrl: DEFAULT_SIGNIN_REDIRECT,
		})
	}

	useEffect(() => {
		const error = searchParams?.get('error')

		if (error) {
			setIsLoading(null)
			const authError = handleOAuthError(error)

			const { description } = authError

			toast.error('Something went wrong', { description, id: 1 })
		}

		return () => {
			toast.dismiss(1)
		}
	}, [searchParams])

	return (
		<div className="flex items-center w-full gap-x-2">
			<Button
				size="lg"
				variant={'outline'}
				className="w-full"
				disabled={isLoading === 'google'}
				onClick={() => handleClick('google')}
			>
				{isLoading === 'google' ? (
					<Icons.spinner className="w-4 h-4" />
				) : (
					<>
						<Icons.google className="h-5 w-5" />
						<span className="sr-only">Sign in with google</span>
					</>
				)}
			</Button>
			<Button
				size="lg"
				variant={'outline'}
				className="w-full"
				disabled={isLoading === 'github'}
				onClick={() => handleClick('github')}
			>
				{isLoading === 'github' ? (
					<Icons.spinner className="w-4 h-4" />
				) : (
					<>
						<Icons.github className="h-5 w-5" />
						<span className="sr-only">Sign in with github</span>
					</>
				)}
			</Button>
		</div>
	)
}
