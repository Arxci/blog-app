import { DisplayPosts } from './_components/display-posts'
import { SearchInput } from '../../components/search-input'

import { getPostsBySearch } from '../_server/actions/post'
import Loading from './loading'

interface BlogPageProps {
	searchParams: {
		page?: string
		search?: string
	}
}

const POSTS_PER_PAGE = 6

export default async function BlogPage({ searchParams }: BlogPageProps) {
	const initialPage = Number(searchParams?.page) || 1
	const initialSearch = searchParams?.search || ''

	const initialData = await getPostsBySearch({
		search: initialSearch,
		skip: POSTS_PER_PAGE * (initialPage - 1),
		take: POSTS_PER_PAGE * initialPage,
	})

	return (
		<main className="container mx-w-4xl py-6 lg:py-10 h-full">
			<div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
				<div className="flex-1 space-y-4">
					<h1 className="inline-block font-black text-4xl lg:text-5xl">Blog</h1>
					<p className="text-xl text-muted-foreground">
						Exploring web development, one post at a time!
					</p>
				</div>
			</div>

			<DisplayPosts
				initialData={initialData}
				initialPage={initialPage}
				initialSearch={initialSearch}
			/>
		</main>
	)
}
