'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import { Button, buttonVariants } from './ui/button'

import { Icons } from './icons'
import { Comment, Dislike, Like, User } from '@prisma/client'

interface PostEngagementProps {
	likesFromProps: Like[]
	commentsFromProps: Comment[]
	viewsFromProps: number
	dislikesFromProps: Dislike[]
	user: User | null
	slug: string
	postId: string
}

export const PostEngagement = ({
	likesFromProps,
	dislikesFromProps,
	commentsFromProps,
	viewsFromProps,
	user,
	slug,
	postId,
}: PostEngagementProps) => {
	const [views, setViews] = useState<number>(viewsFromProps)
	const [comments, setComments] = useState<Comment[]>(commentsFromProps)
	const [dislikes, setDislikes] = useState<Dislike[]>(dislikesFromProps)
	const [likes, setLikes] = useState<Like[]>(likesFromProps)

	const didUserLike =
		likes.filter((like) => like.userId === user?.id).length > 0
	const didUserDislike =
		dislikes.filter((dislike) => dislike.userId === user?.id).length > 0

	useEffect(() => {
		const incrementViewCount = async () => {
			setViews((preViews) => preViews + 1)

			await fetch('/api/post/view', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application.json' },
				body: JSON.stringify({ slug }),
			}).catch((error) => {})
		}

		incrementViewCount()
	}, [slug])

	const likePostHandle = async () => {
		if (user) {
			if (didUserLike) {
				setLikes((prevLikes) => {
					return prevLikes.filter((prevLike) => prevLike.userId != user?.id)
				})
			} else {
				setLikes((prevLikes) => {
					return [...prevLikes, { id: '', postId: '', userId: user?.id }]
				})
			}

			await fetch('/api/post/like', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application.json' },
				body: JSON.stringify({ userId: user.id, postId }),
			}).catch((error) => {})
		}
	}

	const dislikePostHandle = async () => {
		if (user) {
			if (didUserDislike) {
				setDislikes((prevDislikes) => {
					return prevDislikes.filter(
						(prevDislike) => prevDislike.userId != user?.id
					)
				})
			} else {
				setDislikes((prevDislikes) => {
					return [...prevDislikes, { id: '', postId: '', userId: user?.id }]
				})
			}

			await fetch('/api/post/dislike', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application.json' },
				body: JSON.stringify({ userId: user.id, postId }),
			}).catch((error) => {})
		}
	}

	return (
		<div className="md:ml-auto flex space-x-1">
			<div>
				<Button
					size="sm"
					variant="ghost"
					radius="full"
					onClick={likePostHandle}
					disabled={!user}
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
					disabled={!user}
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
