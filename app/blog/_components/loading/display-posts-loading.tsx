import { PostItemLoading } from '@/components/loading/post-item-loading'
import { Skeleton } from '@/components/ui/skeleton'

export const DisplayPostsLoading = () => {
	return (
		<>
			<ul className="grid md:grid-cols-2 gap-4 mt-8">
				<PostItemLoading />
				<PostItemLoading />
				<PostItemLoading />
				<PostItemLoading />
				<PostItemLoading />
				<PostItemLoading />
			</ul>
			<div className="flex max-w-max ml-auto gap-4">
				<Skeleton className="border border-input rounded-lg h-9 w-20" />
				<Skeleton className="border border-input rounded-lg h-9 w-20" />
			</div>
		</>
	)
}
