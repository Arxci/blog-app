import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import prismaDB from '@/lib/prisma'

export const PATCH = async (req: Request) => {
	try {
		const { slug } = await req.json()

		if (!slug) {
			return new NextResponse('Please verify the information is correct.', {
				status: 400,
			})
		}

		const views =
			(await prismaDB.post.update({
				where: {
					slug,
				},
				data: {
					views: { increment: 1 },
				},
				select: {
					views: true,
				},
			})) || 0

		return NextResponse.json(views)
	} catch (error) {
		console.log('POST_VIEW_PATCH ', error)
		return new NextResponse('Internal error', { status: 400 })
	}
}
