import { posts } from '#site/content'
import { PostItem } from '@/components/post-item'
import { QueryPagination } from '@/app/(root)/blog/_components/query-pagination'
import { sortPosts } from '@/lib/utils'

const POSTS_PER_PAGE = 6

interface BlogPageProps {
	searchParams: {
		page?: string
	}
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
	const currentPage = Number(searchParams?.page) || 1
	const sortedPost = sortPosts(posts.filter((post) => post.published))
	const totalPages = Math.ceil(sortedPost.length / POSTS_PER_PAGE)

	const displayPosts = sortedPost.slice(
		POSTS_PER_PAGE * (currentPage - 1),
		POSTS_PER_PAGE * currentPage
	)

	return (
		<div className="container mx-w-4xl py-6 lg:py-10">
			<div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
				<div className="flex-1 space-y-4">
					<h1 className="inline-block font-black text-4xl lg:text-5xl">Blog</h1>
					<p className="text-xl text-muted-foreground">
						Exploring web development, one post at a time!
					</p>
				</div>
			</div>
			<hr className="mt-8" />
			{displayPosts?.length > 0 ? (
				<ul className="grid md:grid-cols-2 gap-4 mt-8">
					{displayPosts.map((post) => (
						<li key={post.slug}>
							<PostItem {...post} />
						</li>
					))}
				</ul>
			) : (
				<p>Nothing to see here yet.</p>
			)}
			<QueryPagination
				totalPages={totalPages}
				className="justify-end mt-4"
			/>
		</div>
	)
}
