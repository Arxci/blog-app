import Image from 'next/image'
import Link from 'next/link'

import { getPostEngagement } from '@/app/_server/actions/post'

import { buttonVariants } from './ui/button'

import { Icons } from './icons'
import { PostEngagement } from './post-engagement'

import { auth } from '@/auth'

import { formatDate } from '@/lib/utils'

interface PostItemProps {
	slug: string
	title: string
	description?: string
	date: string
	banner: string
}

export const PostItem = async ({
	slug,
	title,
	description,
	date,
	banner,
}: PostItemProps) => {
	const initialData = await getPostEngagement(slug)

	const session = await auth()

	const user = session?.user

	return (
		<div className="grid grid-rows-[auto_auto_1fr_auto] gap-2 border-border border-b h-full">
			<div className="aspect-video relative rounded-lg overflow-hidden">
				<Image
					src={banner}
					alt={title}
					className="object-cover"
					fill
				/>
			</div>
			<div className="flex gap-2 items-center ">
				<div className="text-md font-semibold">Garrett Humbert</div>
				<div>
					<p className="sr-only">Published On</p>
					<div className="flex text-sm items-center gap-1">
						<Icons.calendar />
						<time dateTime={date}>{formatDate(date)}</time>
					</div>
				</div>
			</div>
			<div className="space-y-2">
				<div>
					<h2 className="text-2xl font-bold">
						<Link href={slug}>{title}</Link>
					</h2>
				</div>
				<div className="max-w-none text-muted-foreground">{description}</div>
			</div>
			<div className="flex justify-between items-center">
				<PostEngagement
					initialData={initialData}
					user={user}
					incrementViewCounter={false}
				/>
				<Link
					href={slug}
					className={buttonVariants({ variant: 'link' })}
				>
					Read more
				</Link>
			</div>
		</div>
	)
}
