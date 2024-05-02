import Image from 'next/image'
import Link from 'next/link'

import { useSession } from 'next-auth/react'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { Comment, Dislike, Like, Post } from '@prisma/client'

import { Button } from '../ui/button'

import { PostEngagement } from './post-engagement'
import { PostAuthor } from './post-author'

import { formatDate } from '@/lib/utils'

type PostItemProps = Post & {
	likes: Like[]
	comments: Comment[]
	dislikes: Dislike[]
	refetch: (
		options?: RefetchOptions | undefined
	) => Promise<QueryObserverResult>
}

export const PostItem = ({
	slug,
	title,
	description,
	date,
	banner,
	refetch,
	comments,
	likes,
	dislikes,
	views,
}: PostItemProps) => {
	const { data: session } = useSession()

	const user = session?.user

	return (
		<div className="grid grid-rows-[auto_1fr_auto] grid-cols-1 gap-2 h-full">
			<div className="aspect-video relative rounded-sm md:rounded-md lg:rounded-lg overflow-hidden">
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
						className="flex ml-auto text-sm text-muted-foreground items-center "
					>
						<time
							dateTime={date}
							className=""
						>
							{formatDate(date)}
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
			<div className="mt-2">
				<PostEngagement
					initialData={{ slug, comments, likes, dislikes, views }}
					user={user}
					isDisplay={true}
					refetchPosts={refetch}
				/>
			</div>
		</div>
	)
}

/*

*/
