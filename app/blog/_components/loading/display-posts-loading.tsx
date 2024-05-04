import { PostItemLoading } from '@/components/loading/post-item-loading'
import { SearchInput } from '@/components/search-input'
import { Skeleton } from '@/components/ui/skeleton'

interface DisplayPostsLoadingProps {
	currentSearch?: string
}

export const DisplayPostsLoading = ({
	currentSearch,
}: DisplayPostsLoadingProps) => {
	return (
		<>
			<div className="mt-8">
				<Skeleton className="h-10 w-full rounded-full" />
			</div>
			<hr className="mt-4" />
			<ul className="grid md:grid-cols-2 gap-4 mt-8">
				<PostItemLoading />
				<PostItemLoading />
				<PostItemLoading />
				<PostItemLoading />
				<PostItemLoading />
				<PostItemLoading />
			</ul>
			<div className="flex max-w-max ml-auto gap-4">
				<Skeleton className="border border-input rounded-lg h-9 w-24" />
				<Skeleton className="border border-input rounded-lg h-9 w-24" />
			</div>
		</>
	)
}
