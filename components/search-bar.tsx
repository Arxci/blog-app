import { AnimatedTabs } from './animated-tabs'
import { Icons } from './icons'

import { SearchInput } from './search-input'

const tabs = [
	{
		id: 'popular',
		label: 'Popular',
		icon: <Icons.flame className="text-red-500 z-10 relative" />,
	},
	{
		id: 'new',
		label: 'New',
		icon: <Icons.circlePlus className="text-blue-500 z-10 relative" />,
	},
	{
		id: 'trending',
		label: 'Trending',
		icon: <Icons.trendingUp className="text-green-500 z-10 relative" />,
	},
]

export const SearchBar = () => {
	return (
		<div className="border-border border w-full sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 container">
			<div className="flex items-center gap-4 h-14 ">
				<AnimatedTabs tabs={tabs} />
				<SearchInput />
			</div>
		</div>
	)
}
