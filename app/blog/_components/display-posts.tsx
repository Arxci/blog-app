'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'

import { PostItem } from '@/components/post/post-item'
import { QueryPagination } from './query-pagination'

import { getPostsBySearch } from '@/app/_server/actions/post'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Comment, Dislike, Like, Post } from '@prisma/client'
import { SearchInput } from '@/components/search-input'
import { useRouter } from 'next/navigation'
import { Icons } from '@/components/icons'
import { DisplayPostsLoading } from './loading/display-posts-loading'

const POSTS_PER_PAGE = 6

interface DisplayPostsProps {
	initialPage: number
	initialSearch: string
	initialData:
		| [
				number,
				Array<
					Post & { comments: Comment[]; likes: Like[]; dislikes: Dislike[] }
				>
		  ]
		| undefined
}

export const DisplayPosts = ({
	initialPage,
	initialSearch,
	initialData,
}: DisplayPostsProps) => {
	const [currentPage, setCurrentPage] = React.useState<number>(initialPage)
	const [currentSearch, setCurrentSearch] =
		React.useState<string>(initialSearch)

	const { data, refetch } = useQuery({
		queryKey: ['blog', 'posts'],
		queryFn: async () =>
			await getPostsBySearch({
				search: currentSearch,
				skip: POSTS_PER_PAGE * (currentPage - 1),
				take: POSTS_PER_PAGE * currentPage,
			}),
		initialData,
	})
	const { mutate, isPending } = useMutation({
		mutationFn: async ({
			newSearch = '',
			newPage = 1,
		}: {
			newSearch?: string
			newPage?: number
		}) => {
			setCurrentSearch(newSearch)
			setCurrentPage(newPage)
		},
		onSuccess: () => refetch(),
	})

	if (!data) return

	const totalPages = Math.ceil(data[0] / POSTS_PER_PAGE)

	const changePageHandle = (newPage: number) => {
		document.body.scrollTop = 0 // For Safari
		document.documentElement.scrollTop = 0
		mutate({ newPage })
	}

	const changeSearchHandle = (newSearch: string) => {
		mutate({ newSearch })
	}

	if (data[1]?.length === 0) {
		return (
			<div className="h-full flex items-center justify-center">
				<div className="flex flex-col md:flex-row text-center gap-4 items-center justify-center">
					<p>Nothing found. Adjust your search and try again.</p>
					<Button
						radius="full"
						onClick={() => changeSearchHandle('')}
						disabled={isPending}
					>
						{isPending ? (
							<Icons.spinner
								className="animate-spin h-4 w-4"
								aria-hidden="true"
							/>
						) : (
							'Take me back'
						)}
					</Button>
				</div>
			</div>
		)
	}

	return (
		<>
			<div className="mt-8">
				<SearchInput
					defaultValue={currentSearch}
					onClear={changeSearchHandle}
					onSubmit={changeSearchHandle}
					isLoading={isPending}
				/>
			</div>
			<hr className="mt-4" />
			<ul className="grid md:grid-cols-2 gap-4 mt-8">
				{data[1].map((post) => (
					<li key={post.slug}>
						<PostItem
							{...post}
							refetch={refetch}
						/>
					</li>
				))}
			</ul>
			<QueryPagination
				totalPages={totalPages}
				currentPage={currentPage}
				onPageChanged={changePageHandle}
				className="justify-end mt-4"
			/>
		</>
	)
}
