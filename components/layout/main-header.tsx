import Link from 'next/link'

import { Button } from '../ui/button'

import { siteConfig } from '@/config/site'

export const MainHeader = () => {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container h-16 flex items-center">
				<div className="flex items-center">
					<Link
						href="/"
						className="mr-12 font-semibold text-xl text-foreground"
					>
						{siteConfig.name}
					</Link>
				</div>
				<div className="ml-auto">
					<Button radius="full">Sign In</Button>
				</div>
			</div>
		</header>
	)
}
