import type { Metadata, Viewport } from 'next'

import { Toaster } from '@/components/ui/sonner'

import { siteConfig } from '@/config/site'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'

import '@/styles/globals.css'
import { Providers } from '@/app/_helpers/providers/providers'
import { MainHeader } from '@/components/layout/main-header'

export const metadata: Metadata = {
	title: siteConfig.name,
	description: siteConfig.description,
}

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' },
	],
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
					'min-h-screen bg-background text-foreground antialiased',
					fontSans.variable
				)}
			>
				<Providers>
					<Toaster />
					<div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
						<MainHeader />
						{children}
					</div>
				</Providers>
			</body>
		</html>
	)
}
