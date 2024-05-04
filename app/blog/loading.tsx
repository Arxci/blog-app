import { Skeleton } from '@/components/ui/skeleton'
import { DisplayPostsLoading } from './_components/loading/display-posts-loading'

export default function Loading() {
	return (
		<main className="container mx-w-4xl py-6 lg:py-10">
			<div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
				<div className="flex-1 space-y-4">
					<h1 className="inline-block font-black text-4xl lg:text-5xl">Blog</h1>
					<p className="text-xl text-muted-foreground">
						Exploring web development, one post at a time!
					</p>
				</div>
			</div>

			<DisplayPostsLoading />
		</main>
	)
}
