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
	filter: 'popular' | 'new' | 'most-viewed',
	search?: string
): Promise<Post[]> {
	const sortedArr = arr.sort((a, b) => {
		if (a.date > b.date) return -1
		if (a.date < b.date) return 1
		return 0
	})

	const searchedPosts = sortedArr.filter((sortedPost) => {
		if (!search) return true

		if (
			sortedPost.title
				.toLocaleLowerCase()
				.includes(search.toLocaleLowerCase()) ||
			sortedPost.description
				?.toLocaleLowerCase()
				.includes(search.toLocaleLowerCase()) ||
			sortedPost.tags?.includes(search.toLocaleLowerCase())
		) {
			return true
		}

		return false
	})

	const rankedPosts = await rankPosts(searchedPosts, 'desc')

	switch (filter) {
		case 'popular':
			return rankedPosts.map((post) => {
				const index = searchedPosts.findIndex(
					(sortedPost) => sortedPost.slug === post.slug
				)

				return searchedPosts[index]
			})
		case 'new':
			return searchedPosts

		case 'most-viewed':
			const temp = rankedPosts.sort((a, b) => b.views - a.views)

			return temp.map((post) => {
				const index = searchedPosts.findIndex(
					(sortedPost) => sortedPost.slug === post.slug
				)
				return searchedPosts[index]
			})
	}
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
		const index = posts.findIndex((post) => post.slug === item.slug)

		const { comments, likes, dislikes, views, slug } = posts[index]

		return {
			rating: likes.length - dislikes.length + comments.length,
			views,
			slug: slug,
		}
	})

	if (orderBy == 'desc') return ratings.sort((a, b) => b.rating - a.rating)
	return ratings.sort((a, b) => a.rating - b.rating)
}
