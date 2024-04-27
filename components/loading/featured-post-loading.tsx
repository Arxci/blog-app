import { Skeleton } from '../ui/skeleton'

export const FeaturedPostLoading = () => {
	return (
		<div className="border h-[400px] rounded-xl overflow-hidden">
			<div className="w-full h-full flex flex-col bg-black/40 items-stretch">
				<div className="p-3 space-y-1">
					<Skeleton className="w-full h-8 rounded-full border-input border" />
					<Skeleton className="w-full h-4 rounded-full border-input border" />
				</div>
				<div className="w-full h-16 bottom-0 bg-black/80 mt-auto border-t border-border/40 flex items-center justify-between px-3">
					<Skeleton className="w-24 h-4 rounded-full border-input border" />
					<Skeleton className="w-20 h-7 rounded-full border-input border" />
				</div>
			</div>
		</div>
	)
}
