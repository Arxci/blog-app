import { SearchFilters } from './search-filters'
import { SearchInput } from './search-input'

export const SearchBar = () => {
	return (
		<div className="border-border border w-full sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 container">
			<div className="flex items-center gap-2 md:gap-4 h-14 ">
				<SearchFilters />
				<SearchInput />
			</div>
		</div>
	)
}
