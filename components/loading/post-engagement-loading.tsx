import { Skeleton } from '../ui/skeleton'

export const PostEngagementLoading = () => {
	return (
		<div className="flex space-x-1 items-center h-8">
			<div className="h-full flex">
				<Skeleton className="h-full rounded-l-full rounded-r-none w-12 border-input border" />
				<Skeleton className="h-full rounded-r-full rounded-l-none w-12 border-input border" />
			</div>

			<Skeleton className="h-full rounded-full w-12 border-input border" />

			<Skeleton className="h-full rounded-full w-12 border-input border" />
		</div>
	)
}
