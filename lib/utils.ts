import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
	const date = new Date(input)
	return date.toLocaleDateString('en-us', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	})
}

export function handleOAuthError(error: string) {
	switch (error) {
		case 'OAuthAccountNotLinked':
			return {
				type: 'error',
				description: 'There may already be an account with that email.',
			}
		default:
			return {
				type: 'error',
				description: 'Something went wrong. Please try again later.',
			}
	}
}
