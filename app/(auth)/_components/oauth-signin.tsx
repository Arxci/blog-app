'use client'

import { useEffect, useState } from 'react'

import { signIn } from 'next-auth/react'

import { toast } from 'sonner'

import { Icons } from '../../../components/icons'
import { Button } from '../../../components/ui/button'

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
		<div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-4">
			<Button
				aria-label="Sign in with Google"
				size="lg"
				variant={'outline'}
				className="w-full bg-background sm:w-auto"
				disabled={isLoading !== null}
				onClick={() => handleClick('google')}
			>
				{isLoading === 'google' ? (
					<Icons.spinner
						className="mr-2 h-4 w-4 animate-spin"
						aria-hidden="true"
					/>
				) : (
					<Icons.google className="mr-2" />
				)}
				<span className="sr-only sm:not-sr-only">Google</span>
			</Button>
			<Button
				aria-label="Sign in with Github"
				size="lg"
				variant={'outline'}
				className="w-full bg-background sm:w-auto"
				disabled={isLoading !== null}
				onClick={() => handleClick('github')}
			>
				{isLoading === 'github' ? (
					<Icons.spinner
						className="mr-2 h-4 w-4 animate-spin"
						aria-hidden="true"
					/>
				) : (
					<Icons.github className="mr-2" />
				)}
				<span className="sr-only sm:not-sr-only">Google</span>
			</Button>
		</div>
	)
}
