import { Suspense } from 'react'
import { DisplayPosts } from './_components/display-posts'
import { DisplayPostsLoading } from './_components/loading/display-posts-loading'
import { SearchInput } from '../../components/search-input'

interface BlogPageProps {
	searchParams: {
		page?: string
		search?: string
	}
}

export default function BlogPage({ searchParams }: BlogPageProps) {
	const currentPage = Number(searchParams?.page) || 1
	const currentSearch = searchParams?.search || ''

	return (
		<main
			className="container mx-w-4xl py-6 lg:py-10"
			key={Math.random()}
		>
			<div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
				<div className="flex-1 space-y-4">
					<h1 className="inline-block font-black text-4xl lg:text-5xl">Blog</h1>
					<p className="text-xl text-muted-foreground">
						Exploring web development, one post at a time!
					</p>
				</div>
				<div className="max-w-md w-full mt-auto">
					<SearchInput defaultValue={currentSearch} />
				</div>
			</div>
			<hr className="mt-8" />
			<Suspense fallback={<DisplayPostsLoading />}>
				<DisplayPosts
					currentPage={currentPage}
					currentSearch={currentSearch}
				/>
			</Suspense>
		</main>
	)
}
