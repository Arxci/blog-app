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

		const hasDisliked = await prismaDB.dislike.findFirst({
			where: {
				postId,
				userId,
			},
		})

		let dislike

		if (hasDisliked) {
			dislike = await prismaDB.dislike.delete({
				where: {
					id: hasDisliked.id,
				},
			})
		} else {
			dislike = await prismaDB.dislike.create({
				data: {
					postId,
					userId,
				},
			})
		}

		return NextResponse.json(dislike)
	} catch (error) {
		console.log('POST_DISLIKE_PATCH ', error)
		return new NextResponse('Internal error', { status: 400 })
	}
}
