import Image from 'next/image'
import Link from 'next/link'

import { formatDistanceToNow } from 'date-fns'

import { getPostEngagement } from '@/app/_server/actions/post'

import { Icons } from './icons'
import { PostEngagement } from './post-engagement'

import { auth } from '@/auth'

import { formatDate } from '@/lib/utils'
import { Button } from './ui/button'
import { PostAuthor } from './post-author'

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

	const timeSince = formatDistanceToNow(date, { addSuffix: true })

	return (
		<div className="grid grid-rows-[auto_1fr_auto] grid-cols-1 gap-2 h-full">
			<div className="aspect-video relative rounded-lg overflow-hidden">
				<Image
					src={banner}
					alt={title}
					className="object-cover"
					fill
				/>
			</div>
			<div>
				<div className="flex items-center ">
					<PostAuthor />
					<div
						aria-label="Published on"
						className="flex text-sm items-center "
					>
						<Icons.dot className="hidden sm:block" />
						<time
							dateTime={timeSince}
							className="hidden sm:block"
						>
							{timeSince.charAt(0).toUpperCase() + timeSince.slice(1)}
						</time>
					</div>
				</div>
				<Button
					variant="link"
					className="p-0 mb-1 h-auto whitespace-normal text-left "
				>
					<Link href={slug}>
						<h2 className="text-2xl font-bold">{title}</h2>
					</Link>
				</Button>
				<div className="max-w-none text-muted-foreground">{description}</div>
			</div>
			<PostEngagement
				initialData={initialData}
				user={user}
				incrementViewCounter={false}
			/>
		</div>
	)
}
