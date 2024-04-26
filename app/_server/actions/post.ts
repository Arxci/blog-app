'use server'

import prismaDB from '../../../lib/prisma'

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
	return await prismaDB.post.findUnique({
		where: { slug },
		select: {
			id: true,
			slug: true,
			views: true,
			likes: true,
			comments: true,
			dislikes: true,
		},
	})
}

export async function getPosts() {
	const posts = await prismaDB.post.findMany()

	return posts
}

export async function likePost(userId: string, slug: string) {
	const like = await prismaDB.like.findFirst({
		where: {
			postId: slug,
			userId,
		},
	})

	if (like) {
		return await prismaDB.like.delete({
			where: {
				...like,
			},
		})
	}

	const dislike = await prismaDB.dislike.findFirst({
		where: {
			postId: slug,
			userId,
		},
	})

	if (dislike) {
		await prismaDB.dislike.delete({
			where: { ...dislike },
		})
	}

	return await prismaDB.like.create({
		data: {
			postId: slug,
			userId,
		},
	})
}

export async function dislikePost(userId: string, slug: string) {
	const dislike = await prismaDB.dislike.findFirst({
		where: {
			postId: slug,
			userId,
		},
	})

	if (dislike) {
		return await prismaDB.dislike.delete({
			where: {
				...dislike,
			},
		})
	}

	const like = await prismaDB.like.findFirst({
		where: {
			postId: slug,
			userId,
		},
	})

	if (like) {
		await prismaDB.like.delete({
			where: { ...like },
		})
	}

	return await prismaDB.dislike.create({
		data: {
			postId: slug,
			userId,
		},
	})
}

export async function incrementView(slug: string) {
	return await prismaDB.post.update({
		where: {
			slug,
		},
		data: {
			views: { increment: 1 },
		},
		select: {
			views: true,
		},
	})
}
