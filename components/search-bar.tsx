import { AnimatedTabs } from './animated-tabs'

import { SearchInput } from './search-input'

const tabs = [
	{ id: 'popular', label: 'Popular' },
	{ id: 'new', label: 'New' },
	{ id: 'trending', label: 'Trending' },
]

export const SearchBar = () => {
	return (
		<div className="border-border border w-full sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
			<div className="flex items-center gap-4 h-14 px-2">
				<AnimatedTabs tabs={tabs} />
				<SearchInput />
			</div>
		</div>
	)
}
