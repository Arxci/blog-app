'use client'

import Link from 'next/link'
import { Button } from '../ui/button'

interface AuthBackButtonProps {
	href: string
	label: string
}

export const AuthBackButton = ({ href, label }: AuthBackButtonProps) => {
	return (
		<Button
			variant="link"
			className="font-normal w-full"
			size="sm"
			asChild
		>
			<Link href={href}>{label}</Link>
		</Button>
	)
}
