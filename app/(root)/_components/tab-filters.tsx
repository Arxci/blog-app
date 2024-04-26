'use client'

import { useContext } from 'react'

import { AnimatedTabs } from '../../../components/ui/animated-tabs'

import { Icons } from '../../../components/icons'
import { FiltersContext } from '@/store/filters-context'

const tabOptions = [
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

export const TabFilters = () => {
	const filtersContext = useContext(FiltersContext)

	return (
		<AnimatedTabs
			tabs={tabOptions}
			valueFromProps={filtersContext.activeFilter}
			onChangeFromProps={filtersContext.setActiveFilter}
		/>
	)
}
