'use client'

import { useEffect } from 'react'

import Link from 'next/link'

import { User } from 'next-auth'

import { useMutation, useQuery } from '@tanstack/react-query'

import { Comment, Dislike, Like } from '@prisma/client'

import { Button, buttonVariants } from './ui/button'

import { Icons } from './icons'

import {
	dislikePost,
	getPostEngagement,
	incrementView,
	likePost,
} from '@/lib/post'
import { toast } from 'sonner'

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
		queryKey: ['postId', initialData?.slug],
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
					incrementView(initialData?.slug || '')
					break
			}
		},
		onSuccess: (data, type) => refetch(),
	})

	if (!data || isLoading) {
		return <div>Loading...</div>
	}

	const { likes, comments, dislikes, views, slug } = data

	const didUserLike =
		likes.filter((like) => like.userId === user?.id).length > 0
	const didUserDislike =
		dislikes.filter((dislike) => dislike.userId === user?.id).length > 0

	useEffect(() => {
		if (incrementViewCounter) {
			mutate('VIEW')
		}
	}, [])

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
		<div className="flex space-x-1">
			<div>
				<Button
					size="sm"
					variant="ghost"
					radius="full"
					onClick={likePostHandle}
					disabled={!user || isPending}
					data-state={didUserLike ? 'selected' : 'deselected'}
					className="data-[state=selected]:bg-green-500/20 data-[state=selected]:text-green-500 data-[state=selected]:hover:bg-green-500/10 transition-colors"
				>
					<span className="sr-only">Likes</span>
					<div className="text-sm sm:text-base font-medium flex items-center gap-1">
						<Icons.like />
						<p>{likes.length}</p>
					</div>
				</Button>
			</div>
			<div>
				<Button
					size="sm"
					variant="ghost"
					radius="full"
					onClick={dislikePostHandle}
					disabled={!user || isPending}
					data-state={didUserDislike ? 'selected' : 'deselected'}
					className="data-[state=selected]:bg-red-500/20 data-[state=selected]:text-red-500 data-[state=selected]:hover:bg-red-500/10 transition-colors"
				>
					<span className="sr-only">Dislikes</span>
					<div className="text-sm sm:text-base font-medium flex items-center gap-1">
						<Icons.dislike />
						<p>{dislikes.length}</p>
					</div>
				</Button>
			</div>
			<div>
				<Button
					size="sm"
					variant="ghost"
					radius="full"
					asChild
				>
					<Link href="#comments">
						<span className="sr-only">Comments</span>
						<div className="text-sm sm:text-base font-medium flex items-center gap-1">
							<Icons.message />
							<p>{comments.length}</p>
						</div>
					</Link>
				</Button>
			</div>
			<div
				className={buttonVariants({
					variant: 'secondary',
					size: 'sm',
					radius: 'full',
					className: 'bg-transparent hover:bg-transparent',
				})}
			>
				<span className="sr-only">Views</span>
				<div className="text-sm sm:text-base font-medium flex items-center gap-1">
					<Icons.eye />
					<p>{views}</p>
				</div>
			</div>
		</div>
	)
}
