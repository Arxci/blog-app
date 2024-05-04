import { Skeleton } from '@/components/ui/skeleton'
import { DisplayPostsLoading } from './_components/loading/display-posts-loading'

export default function Loading() {
	return (
		<main className="container mx-w-4xl py-6 lg:py-10">
			<div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
				<div className="flex-1 space-y-4">
					<Skeleton className="rounded-full h-12 w-32" />
					<Skeleton className="rounded-full h-7 w-full max-w-sm" />
				</div>
			</div>

			<DisplayPostsLoading />
		</main>
	)
}
