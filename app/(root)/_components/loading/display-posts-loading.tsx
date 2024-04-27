import { FeaturedPostLoading } from '@/components/loading/featured-post-loading'
import { PostItemLoading } from '@/components/loading/post-item-loading'
import { Skeleton } from '@/components/ui/skeleton'

export const DisplayPostsLoading = () => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-10 pb-6">
			<div className="col-span-2 space-y-6">
				<ul className="flex flex-col gap-4 mb-6 lg:mb-0 ">
					<li>
						<PostItemLoading />
					</li>
					<li>
						<PostItemLoading />
					</li>
					<li>
						<PostItemLoading />
					</li>
					<li>
						<PostItemLoading />
					</li>
				</ul>
				<Skeleton className="w-full rounded-full h-10" />
			</div>
			<div className="flex flex-col">
				<h3 className="font-semibold text-xl md:text-2xl lg:text-3xl mb-6">
					Featured Posts
				</h3>
				<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 pb-4">
					<li>
						<FeaturedPostLoading />
					</li>
					<li>
						<FeaturedPostLoading />
					</li>
				</ul>
			</div>
		</div>
	)
}
