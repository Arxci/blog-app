'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const ViewIncrement = ({
	children,
	slug,
}: {
	children: React.ReactNode
	slug: string
}) => {
	const router = useRouter()

	useEffect(() => {
		const updateViewCount = async () => {
			await fetch('/api/post/view', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application.json' },
				body: JSON.stringify({ slug }),
			})
			router.refresh()
		}

		updateViewCount()
	}, [slug])

	return <div>{children}</div>
}
