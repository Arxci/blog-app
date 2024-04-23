import { Post } from '#site/content'

import prismaDB from './prisma'

export function sortPosts(posts: Array<Post>): Post[] {
	return posts.sort((a, b) => {
		if (a.date > b.date) return -1
		if (a.date < b.date) return 1
		return 0
	})
}

export async function getPostBySlug({
	slug,
	include,
}: {
	slug: string
	include?: { comments?: boolean; likes?: boolean; dislikes?: boolean }
}) {
	const post = await prismaDB.post.findUnique({
		where: { slug },
		include: { ...include },
	})

	return post
}

export async function getPostEngagement(slug: string) {
	const postEngagement = (await prismaDB.post.findUnique({
		where: { slug },

		select: {
			views: true,
			_count: {
				select: { likes: true, dislikes: true, comments: true },
			},
		},
	})) || { views: 0, _count: { comments: 0, likes: 0, dislikes: 0 } }

	console.log(postEngagement)

	return postEngagement
}
