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
						<Skeleton className="max-w-xl w-full h-16 rounded-full border border-input" />
						<div className="w-full max-w-[42rem] space-y-2 mx-auto">
							<Skeleton className="w-full rounded-full h-7 border border-input" />
							<Skeleton className="w-full rounded-full h-7 border border-input" />
						</div>
						<Skeleton className="max-w-[475px] w-full h-10 rounded-full border border-input" />
					</div>
				</div>
			</PageSectionContainer>
			<PageSectionContainer>
				<Skeleton className="w-full rounded-full h-9 mb-2 border border-input" />
				<Skeleton className="w-full max-w-sm rounded-full h-9 mb-4 border border-input" />
				<div className="flex items-center space-x-1 bg-muted/20 rounded-full max-w-max h-10 p-1.5">
					<Skeleton className="w-24 rounded-full h-full border border-input" />
					<Skeleton className="w-24 rounded-full h-full border border-input" />
					<Skeleton className="w-24 rounded-full h-full  border border-input" />
				</div>
				<Separator className="mb-4 mt-4" />
				<DisplayPostsLoading />
			</PageSectionContainer>
		</main>
	)
}
