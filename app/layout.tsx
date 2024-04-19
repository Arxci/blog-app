import type { Metadata } from 'next'

import { siteConfig } from '@/config/site'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'

import '@/styles/globals.css'

export const metadata: Metadata = {
	title: siteConfig.name,
	description: siteConfig.description,
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
		>
			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased ',
					fontSans.variable
				)}
			>
				{children}
			</body>
		</html>
	)
}
