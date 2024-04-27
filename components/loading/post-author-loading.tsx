import { Skeleton } from '../ui/skeleton'

export const PostAuthorLoading = () => {
	return (
		<div className="flex items-center gap-1">
			<Skeleton className="h-8 w-8 p-0 rounded-full border-input border" />
			<Skeleton className="h-4 w-20 p-0 rounded-full border-input border" />
		</div>
	)
}
