'use client'

import { ReactNode } from 'react'

import { Card, CardContent, CardHeader, CardFooter } from '../ui/card'

import { AuthCardHeader } from './auth-card-header'
import { OAuthSignIn } from './oauth-signin'
import { AuthBackButton } from './auth-back-button'

interface AuthCardWrapperProps {
	children?: ReactNode
	headerLabel: string
	backButtonLabel: string
	backButtonHref: string
	showSocial?: boolean
}

export const AuthCardWrapper = ({
	children,
	headerLabel,
	backButtonHref,
	backButtonLabel,
	showSocial,
}: AuthCardWrapperProps) => {
	return (
		<Card className="w-[400px] shadow-md">
			<CardHeader>
				<AuthCardHeader label={headerLabel} />
			</CardHeader>
			<CardContent>{children}</CardContent>
			{showSocial && (
				<CardFooter>
					<OAuthSignIn />
				</CardFooter>
			)}
			<CardFooter>
				<AuthBackButton
					href={backButtonHref}
					label={backButtonLabel}
				/>
			</CardFooter>
		</Card>
	)
}
