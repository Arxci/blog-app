'use client'

import { Icons } from '../icons'
import { Button } from '../ui/button'

export const OAuthSignIn = () => {
	return (
		<div className="flex items-center w-full gap-x-2">
			<Button
				size="lg"
				variant={'outline'}
				className="w-full"
			>
				<Icons.google className="h-5 w-5" />
				<span className="sr-only">Sign in with google</span>
			</Button>
			<Button
				size="lg"
				variant={'outline'}
				className="w-full"
			>
				<Icons.github className="h-5 w-5" />
				<span className="sr-only">Sign in with github</span>
			</Button>
		</div>
	)
}
