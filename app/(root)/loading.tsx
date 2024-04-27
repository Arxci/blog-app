import { PageSectionContainer } from '@/components/layout/page-section-container'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { DisplayPostsLoading } from './_components/loading/display-posts-loading'

export default function Loading() {
	return (
		<main>
			<PageSectionContainer className="relative w-full mb-14 h-[400px] overflow-hidden lg:rounded-b-lg">
				<div className="absolute bg-black/40 w-full h-full top-0 left-0 supports-[backdrop-filter]:backdrop-blur-[2px]">
					<div className="container flex flex-col h-full justify-center gap-4 items-center">
						<Skeleton className="max-w-lg w-full h-12 rounded-full border border-input" />
						<Skeleton className="max-w-[42rem] w-full rounded-full h-8 border border-input" />
						<Skeleton className="max-w-[500px] w-full h-10 rounded-full border border-input" />
					</div>
				</div>
			</PageSectionContainer>
			<PageSectionContainer>
				<Skeleton className="w-full rounded-full h-10 mb-2 border border-input" />
				<Skeleton className="w-full max-w-sm rounded-full h-10 mb-4 border border-input" />
				<div className="flex items-center gap-2 md:gap-4 h-14">
					<Skeleton className="w-20 rounded-full h-8 border border-input" />
					<Skeleton className="w-20 rounded-full h-8 border border-input" />
					<Skeleton className="w-20 rounded-full h-8 border border-input" />
				</div>
				<Separator className="mb-4 mt-1" />
				<DisplayPostsLoading />
			</PageSectionContainer>
		</main>
	)
}
