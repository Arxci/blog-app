import { posts } from '#site/content'

import { Button } from '@/components/ui/button'

import { PostItem } from '@/components/post/post-item'
import { QueryPagination } from './query-pagination'

import { sortPosts } from '@/lib/utils'
import Link from 'next/link'

const POSTS_PER_PAGE = 6

interface DisplayPostsProps {
	currentPage: number
	currentSearch: string
}

export const DisplayPosts = async ({
	currentPage,
	currentSearch,
}: DisplayPostsProps) => {
	const sortedPost = await sortPosts(
		posts.filter((post) => post.published),
		'new',
		currentSearch
	)
	const totalPages = Math.ceil(sortedPost.length / POSTS_PER_PAGE)

	const displayPosts = sortedPost.slice(
		POSTS_PER_PAGE * (currentPage - 1),
		POSTS_PER_PAGE * currentPage
	)

	if (displayPosts?.length === 0) {
		return (
			<div className="mt-8 flex flex-col md:flex-row text-center gap-4 items-center justify-center">
				<p>Nothing found. Adjust your search and try again.</p>
				<Button
					radius="full"
					asChild
				>
					<Link href="/blog">Take me back</Link>
				</Button>
			</div>
		)
	}

	return (
		<>
			<ul className="grid md:grid-cols-2 gap-4 mt-8">
				{displayPosts.map((post) => (
					<li key={post.slug}>
						<PostItem {...post} />
					</li>
				))}
			</ul>
			<QueryPagination
				totalPages={totalPages}
				className="justify-end mt-4"
			/>
		</>
	)
}
