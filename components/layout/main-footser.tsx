import { siteConfig } from '@/config/site'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Icons } from '../icons'

export const MainFooter = () => {
	return (
		<footer className="mt-14 container lg:px-8 bg-foreground dark:bg-muted/20 lg:rounded-t-xl">
			<div className="grid md:grid-cols-2 gap-8 py-24">
				<div className="space-y-8">
					<h3 className="text-5xl font-semibold text-white">
						{siteConfig.name}
					</h3>
					<ul className=" flex flex-col md:flex-row gap-4">
						{siteConfig.siteMap.map((link) => (
							<Link
								href={link.href}
								key={link.name}
								className="hover:text-muted-foreground/60 text-muted-foreground font-light text-lg"
							>
								{link.name}
							</Link>
						))}
					</ul>
				</div>
				<div className="space-y-5">
					<form className="grid sm:grid-cols-[1fr_auto] gap-2">
						<div className="flex flex-col gap-4">
							<label className="font-medium text-muted-foreground text-2xl">
								Sign up for our newsletter!
							</label>
							<Input
								className="rounded-full h-11 px-4 py-2"
								type="text"
								placeholder="JohnDoe123@gmail.com"
							/>
						</div>
						<Button
							className="mt-auto rounded-full h-11"
							variant="secondary"
						>
							Sign up
						</Button>
					</form>

					<ul className="space-x-2">
						{siteConfig.socials.map((social) => (
							<Button
								key={social.name}
								size="icon"
								variant="outline"
								radius="full"
								aria-label={social.name}
								asChild
							>
								<Link href={social.href}>{<social.icon />}</Link>
							</Button>
						))}
					</ul>
				</div>
			</div>
		</footer>
	)
}
