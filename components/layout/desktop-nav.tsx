import Link from 'next/link'

import { Button } from '../ui/button'

import { Icons } from '../icons'

import { siteConfig } from '@/config/site'

export const DesktopNav = () => {
	return (
		<div className="hidden lg:flex items-center w-full">
			<div className="flex items-center">
				<Link
					href="/"
					className="mr-12 flex items-center gap-2 font-semibold text-xl text-foreground"
				>
					<Icons.logo className="h-6 w-6" />
					<span>{siteConfig.name}</span>
				</Link>
			</div>
			<nav>
				<ul className="flex gap-6">
					{siteConfig.links.map((link) => (
						<li key={link.name}>
							<Link
								className="text-sm text-foreground/60 hover:text-primary"
								href={link.href}
							>
								{link.name}
							</Link>
						</li>
					))}
				</ul>
			</nav>
			<div className="ml-auto space-x-1">
				<Button
					radius="full"
					variant="link"
					asChild
				>
					<Link href="/sign-in">Sign in</Link>
				</Button>
				<Button radius="full">
					<Link href="/sign-up">Sign up</Link>
				</Button>
			</div>
		</div>
	)
}
