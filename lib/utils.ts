import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import prismaDB from './prisma'
import { Comment, Dislike, Like, Post } from '@prisma/client'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function formatDate(input: Date): string {
	return input.toLocaleDateString('en-us', {
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

export function sortPosts(arr: Post[]): Post[] {
	return arr.sort((a, b) => {
		if (a.date > b.date) return -1
		if (a.date < b.date) return 1
		return 0
	})
}

export function rankPosts(
	posts: Array<
		Post & { comments: Comment[]; likes: Like[]; dislikes: Dislike[] }
	>
) {
	const ratings = posts.map((post) => {
		const { comments, likes, dislikes, slug } = post

		return {
			rating: likes.length - dislikes.length + comments.length,
			slug,
		}
	})

	ratings.sort((a, b) => b.rating - a.rating)

	return ratings.map((rating) => {
		const index = posts.findIndex((post) => post.slug === rating.slug)

		return posts[index]
	})
}

/*
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
*/
