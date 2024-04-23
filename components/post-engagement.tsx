'use client'

import { useEffect, useState } from 'react'
import { Icons } from './icons'

interface PostEngagementProps {
	likesFromProps: number
	commentsFromProps: number
	viewsFromProps: number
	dislikesFromProps: number
	slug: string
}

export const PostEngagement = ({
	likesFromProps,
	dislikesFromProps,
	commentsFromProps,
	viewsFromProps,
	slug,
}: PostEngagementProps) => {
	const [views, setViews] = useState<number>(viewsFromProps)
	const [dislikes, setDislikes] = useState<number>(dislikesFromProps)
	const [comments, setComments] = useState<number>(commentsFromProps)
	const [likes, setLikes] = useState<number>(likesFromProps)

	useEffect(() => {
		const updateViewCount = async () => {
			const res = await fetch('/api/post/view', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application.json' },
				body: JSON.stringify({ slug }),
			})

			if (res.ok) {
				const { views: newViews } = await res.json()

				console.log(newViews)

				setViews(newViews)
			}
		}

		updateViewCount()
	}, [slug])

	return (
		<div className="md:ml-auto flex gap-4">
			<div>
				<span className="sr-only">Comments</span>
				<div className="text-sm sm:text-base font-medium flex items-center gap-1">
					<Icons.message />
					<p>{comments}</p>
				</div>
			</div>
			<div>
				<span className="sr-only">Likes</span>
				<div className="text-sm sm:text-base font-medium flex items-center gap-1">
					<Icons.like />
					<p>{likes}</p>
				</div>
			</div>
			<div>
				<span className="sr-only">Dislikes</span>
				<div className="text-sm sm:text-base font-medium flex items-center gap-1">
					<Icons.dislike />
					<p>{dislikes}</p>
				</div>
			</div>
			<div>
				<span className="sr-only">Views</span>
				<div className="text-sm sm:text-base font-medium flex items-center gap-1">
					<Icons.eye />
					<p>{views}</p>
				</div>
			</div>
		</div>
	)
}
