'use client'

import { useState } from 'react'

import Link from 'next/link'

import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

import { Icons } from '../icons'

import { siteConfig } from '@/config/site'
import { useSession } from 'next-auth/react'

export function MobileNav() {
	const [open, setOpen] = useState<boolean>(false)
	const { data: session } = useSession()
	const user = session?.user

	const toggleOpenHandle = () => {
		setOpen((prevState) => !prevState)
	}

	return (
		<div className="lg:hidden w-full flex items-center">
			<Link
				href="/"
				className="mr-12 flex items-center gap-2 font-semibold text-xl text-foreground"
			>
				<Icons.logo className="h-6 w-6" />
				<span>{siteConfig.name}</span>
			</Link>

			<Sheet
				open={open}
				onOpenChange={setOpen}
			>
				<SheetTrigger asChild>
					<Button
						className="rounded-full ml-auto w-6 h-6"
						size="icon"
						variant="ghost"
						onClick={toggleOpenHandle}
					>
						<Icons.hamburger className="w-6 h-6" />
						<span className="sr-only">Toggle menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent className="overflow-y-auto w-full h-full bg-background p-0 grid grid-rows-[auto_1fr_auto] pb-8">
					<SheetHeader className="h-14 px-4 flex-row flex items-center space-y-0">
						<SheetTitle>
							<Link
								href="/"
								className="mr-12 flex items-center gap-2 font-semibold text-xl text-foreground"
							>
								<Icons.logo className="h-6 w-6" />
								<span>{siteConfig.name}</span>
							</Link>
						</SheetTitle>
						<SheetClose className="[&>svg]:w-6 [&>svg]:h-6 top-4" />
					</SheetHeader>

					<div className="px-4 h-full flex flex-col justify-end">
						<nav className="h-full flex items-center justify-center">
							<ul className="flex flex-col items-center gap-8">
								{siteConfig.links.map((link) => (
									<li key={link.name}>
										<Link
											onClick={() => setOpen(false)}
											className="text-2xl text-foreground/60 hover:text-primary"
											href={link.href}
										>
											{link.name}
										</Link>
									</li>
								))}
							</ul>
						</nav>

						<div className="flex flex-col space-y-2">
							<Button
								variant="link"
								className="text-foreground"
								asChild
							>
								<Link href="#">Login</Link>
							</Button>
							<Button
								asChild
								className="rounded-full"
								variant="shadow"
							>
								<Link href="#">Sign Up</Link>
							</Button>
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	)
}
