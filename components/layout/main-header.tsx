import Link from 'next/link'

import { Button } from '../ui/button'

import { siteConfig } from '@/config/site'

export const MainHeader = () => {
	return (
		<header className="top-0 z-50 w-full border-b border-border/40 bg-background">
			<div className="container h-16 flex items-center">
				<div className="flex items-center ">
					<Link
						href="/"
						className="mr-12 font-semibold text-xl"
					>
						{siteConfig.name}
					</Link>
				</div>
				<div className="ml-auto">
					<Button
						variant="shadow"
						radius="full"
					>
						Sign In
					</Button>
				</div>
			</div>
		</header>
	)
}
