import { NextResponse } from 'next/server'

import prismaDB from '@/lib/prisma'
import { auth } from '@/auth'

export const PATCH = async (req: Request) => {
	try {
		const session = await auth()

		if (!session) {
			return new NextResponse('User is unauthenticated', { status: 400 })
		}

		const { userId, postId } = await req.json()

		if (!userId || !postId) {
			return new NextResponse('Please verify the information is correct.', {
				status: 400,
			})
		}

		const hasLiked = await prismaDB.like.findFirst({
			where: {
				postId,
				userId,
			},
		})

		let like

		if (hasLiked) {
			like = await prismaDB.like.delete({
				where: {
					id: hasLiked.id,
				},
			})
		} else {
			like = await prismaDB.like.create({
				data: {
					postId,
					userId,
				},
			})
		}

		return NextResponse.json(like)
	} catch (error) {
		console.log('POST_LIKE_PATCH ', error)
		return new NextResponse('Internal error', { status: 400 })
	}
}
