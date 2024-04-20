import { FC } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { buttonVariants } from './ui/button'

import { Icons } from './icons'

import { cn, formatDate } from '@/lib/utils'

interface PostItemProps {
	slug: string
	title: string
	description?: string
	date: string
	banner: string
}

export const PostItem: FC<PostItemProps> = ({
	slug,
	title,
	description,
	date,
	banner,
}) => {
	return (
		<div className="flex flex-col gap-2 border-border border-b ">
			<div className="aspect-video relative">
				<Image
					src={banner}
					alt={title}
					className="object-cover"
					fill
				/>
			</div>
			<div>
				<h2 className="text-2xl font-bold">
					<Link href={slug}>{title}</Link>
				</h2>
			</div>
			<div className="max-w-none text-muted-foreground">{description}</div>
			<div className="flex justify-between items-center">
				<dl>
					<dt className="sr-only">Published ON</dt>
					<dd className="text-sm sm:text-base font-medium flex items-center gap-1">
						<Icons.calendar />
						<time dateTime={date}>{formatDate(date)}</time>
					</dd>
				</dl>
				<Link
					href={slug}
					className={cn(buttonVariants({ variant: 'link' }), 'py-0')}
				>
					Read more
				</Link>
			</div>
		</div>
	)
}
