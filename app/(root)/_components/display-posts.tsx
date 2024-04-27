import Link from 'next/link'

import { posts } from '#site/content'

import { Button } from '@/components/ui/button'

import { FeaturedPost } from '@/components/post/featured-post'
import { PostItem } from '@/components/post/post-item'
import { getFilteredPosts } from '@/app/_server/actions/post'

interface DisplayPostsProps {
	currentFilter: 'popular' | 'new' | 'most-viewed'
}

export const DisplayPosts = async ({ currentFilter }: DisplayPostsProps) => {
	const sortedPost = await getFilteredPosts(currentFilter)

	const featuredPosts = posts
		.filter((post) => post.isFeatured && post.published)
		.slice(0, 2)

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-10 pb-6">
			<div className="col-span-2 space-y-6">
				<ul className="flex flex-col gap-4 mb-6 lg:mb-0 ">
					{sortedPost.map((post) => (
						<li key={post.slug}>
							<PostItem {...post} />
						</li>
					))}
				</ul>
				<Button
					radius="full"
					className="w-full"
					asChild
				>
					<Link href={'/blog'}>See more</Link>
				</Button>
			</div>
			<div className="flex flex-col">
				<h3 className="font-semibold text-xl md:text-2xl lg:text-3xl mb-6">
					Featured Posts
				</h3>
				<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 pb-4">
					{featuredPosts.map((post) => (
						<li key={post.slug}>
							<FeaturedPost {...post} />
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
