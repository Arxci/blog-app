import Image from 'next/image'
import Link from 'next/link'

import { Button } from './ui/button'

import { Icons } from './icons'

import { formatDate } from '@/lib/utils'

interface FeaturedPostProps {
	slug: string
	title: string
	description?: string
	date: string
	banner: string
}

export const FeaturedPost = ({
	slug,
	title,
	description,
	date,
	banner,
}: FeaturedPostProps) => {
	return (
		<div className="group border h-[400px] bg-muted/80 rounded-xl relative overflow-hidden">
			<Image
				src={banner}
				alt={title}
				className="object-cover group-focus-within:scale-[1.02] group-hover:scale-[1.02] transition-all duration-700"
				fill
			/>
			<div className="absolute w-full h-full transition-all group-focus-within:supports-[backdrop-filter]:backdrop-blur-[2px] group-hover:supports-[backdrop-filter]:backdrop-blur-[2px] bg-black/40 group-focus-within:bg-black/60 group-hover:bg-black/60 duration-300">
				<div className="p-3 space-y-1">
					<Link href={slug}>
						<h4 className="text-2xl text-white font-medium line-clamp-2">
							{title}
						</h4>
					</Link>
					<p className="text-white/80 line-clamp-2">{description}</p>
				</div>
				<div className="absolute w-full h-16 transition-all bottom-0 bg-black/80  group-hover:bg-black duration-300  group-focus-within:bg-black border-t border-border/40 flex items-center justify-between px-3">
					<dl>
						<dt className="sr-only">Published ON</dt>
						<dd className="text-sm text-white/80 font-medium flex items-center gap-1">
							<Icons.calendar />
							<time dateTime={date}>{formatDate(date)}</time>
						</dd>
					</dl>
					<Button
						radius="full"
						size="sm"
						asChild
					>
						<Link href={slug}>Read More</Link>
					</Button>
				</div>
			</div>
		</div>
	)
}
