'use client'

import { useEffect } from 'react'

import Link from 'next/link'

import { User } from 'next-auth'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Comment, Dislike, Like } from '@prisma/client'

import {
	dislikePost,
	getPostEngagement,
	incrementView,
	likePost,
} from '@/app/_server/actions/post'

import { Icons } from '../icons'
import { Toggle, toggleVariants } from '../ui/toggle'

import { cn } from '@/lib/utils'

interface PostEngagementProps {
	initialData: {
		id: string
		slug: string
		views: number
		comments: Comment[]
		likes: Like[]
		dislikes: Dislike[]
	} | null
	user: User | undefined
	incrementViewCounter?: boolean
}

export const PostEngagement = ({
	initialData,
	user,
	incrementViewCounter = true,
}: PostEngagementProps) => {
	const { data, isLoading, refetch } = useQuery({
		queryKey: ['post', initialData?.slug],
		queryFn: async ({ queryKey }) => await getPostEngagement(queryKey[1] || ''),
		initialData: initialData,
	})

	const { mutate, isPending } = useMutation({
		mutationFn: async (type: 'LIKE' | 'DISLIKE' | 'VIEW') => {
			switch (type) {
				case 'LIKE':
					likePost(user?.id || '', initialData?.slug || '')
					break
				case 'DISLIKE':
					dislikePost(user?.id || '', initialData?.slug || '')
					break
				case 'VIEW':
					if (incrementViewCounter) {
						incrementView(initialData?.slug || '')
					}
					break
			}
		},
		onSuccess: () => refetch(),
	})

	useEffect(() => {
		mutate('VIEW')
	}, [mutate])

	if (!data || isLoading) {
		return <div>Loading...</div>
	}

	const { likes, comments, dislikes, views, slug } = data

	const didUserLike =
		likes.filter((like) => like.userId === user?.id).length > 0
	const didUserDislike =
		dislikes.filter((dislike) => dislike.userId === user?.id).length > 0

	const likePostHandle = async () => {
		if (user) {
			mutate('LIKE')
		}
	}

	const dislikePostHandle = async () => {
		if (user) {
			mutate('DISLIKE')
		}
	}

	return (
		<div className="flex space-x-1 items-center h-8">
			<div className="h-full">
				<Toggle
					aria-label="Like post"
					variant="outline"
					size="md"
					disabled={!user || isPending}
					pressed={didUserLike}
					onClick={likePostHandle}
					className="h-full rounded-l-full rounded-r-none [&>svg]:data-[state=on]:fill-foreground space-x-1 text-sm sm:text-base font-medium"
				>
					<Icons.like className="transition-all fill-background" />
					<span>{likes.length}</span>
				</Toggle>

				<Toggle
					aria-label="Dislike post"
					variant="outline"
					size="md"
					disabled={!user || isPending}
					pressed={didUserDislike}
					onClick={dislikePostHandle}
					className="h-full rounded-r-full rounded-l-none [&>svg]:data-[state=on]:fill-foreground space-x-1 text-sm sm:text-base font-medium"
				>
					<Icons.dislike className="transition-all fill-background" />
					<span>{dislikes.length}</span>
				</Toggle>
			</div>

			<Link
				href={`/${slug}/#comments`}
				aria-label="View comments"
				className={cn(
					toggleVariants({ size: 'md', variant: 'outline' }),
					'h-full rounded-full text-sm sm:text-base font-medium space-x-1'
				)}
			>
				<Icons.message />
				<span>{comments.length}</span>
			</Link>

			<div
				aria-label="Post views"
				className={cn(
					toggleVariants({ size: 'md', variant: 'outline' }),
					'h-full rounded-full text-sm sm:text-base font-medium space-x-1'
				)}
			>
				<Icons.eye />
				<span>{views}</span>
			</div>
		</div>
	)
}
