import { Post } from '#site/content'

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import prismaDB from './prisma'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
	const date = new Date(input)
	return date.toLocaleDateString('en-us', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	})
}

export function handleOAuthError(error: string) {
	switch (error) {
		case 'OAuthAccountNotLinked':
			return {
				type: 'error',
				description: 'There may already be an account with that email.',
			}
		default:
			return {
				type: 'error',
				description: 'Something went wrong. Please try again later.',
			}
	}
}

export async function sortPosts(
	arr: Post[],
	filter: 'popular' | 'new' | 'trending'
): Promise<Post[]> {
	const sortedArr = arr.sort((a, b) => {
		if (a.date > b.date) return -1
		if (a.date < b.date) return 1
		return 0
	})

	const rankedPosts = await rankPosts(sortedArr, 'desc')

	switch (filter) {
		case 'popular':
			return rankedPosts.map((post) => {
				const index = sortedArr
					.map((sortedPost) => {
						return sortedPost.slug
					})
					.indexOf(post.slug)

				return sortedArr[index]
			})
		case 'new':
			return sortedArr

		case 'trending':
			arr.sort((a, b) => {
				if (a.date > b.date) return -1
				if (a.date < b.date) return 1
				return 0
			})
			break
	}

	return sortedArr
}

async function rankPosts(arr: Post[], orderBy: 'asc' | 'desc') {
	const posts = await prismaDB.post.findMany({
		include: {
			likes: true,
			dislikes: true,
			comments: true,
		},
	})

	const ratings = arr.map((item) => {
		const index = posts
			.map((post) => {
				return post.id
			})
			.indexOf(item.slug)

		const { comments, likes, dislikes, views, slug } = posts[index]

		return {
			rating: likes.length - dislikes.length + comments.length + views,
			slug: slug,
		}
	})

	if (orderBy == 'desc') return ratings.sort((a, b) => b.rating - a.rating)
	return ratings.sort((a, b) => a.rating - b.rating)
}
