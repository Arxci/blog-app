import { Skeleton } from '../ui/skeleton'
import { PostAuthorLoading } from './post-author-loading'
import { PostEngagementLoading } from './post-engagement-loading'

export const PostItemLoading = () => {
	return (
		<div className="grid grid-rows-[auto_1fr_auto] grid-cols-1 gap-2 h-full">
			<Skeleton className="border border-input aspect-video relative rounded-sm md:rounded-md lg:rounded-lg" />
			<div className="space-y-2">
				<div className="flex items-center ">
					<PostAuthorLoading />
					<Skeleton className="ml-auto h-4 w-20 rounded-full border-input border" />
				</div>
				<Skeleton className="w-full h-8 rounded-full border-input border" />
				<div className="space-y-1">
					<Skeleton className="w-full h-4 rounded-full border-input border" />
					<Skeleton className="w-full h-4 rounded-full border-input border" />
				</div>
			</div>
			<div className="mt-2">
				<PostEngagementLoading />
			</div>
		</div>
	)
}
