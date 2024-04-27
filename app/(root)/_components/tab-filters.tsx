'use client'

import { SetStateAction, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'

import { AnimatedTabs } from '../../../components/ui/animated-tabs'

import { Icons } from '../../../components/icons'

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

export const TabFilters = ({ currentFilter }: { currentFilter: string }) => {
	const [filter, setFilter] = useState<number>(
		tabOptions
			.map((x) => {
				return x.id
			})
			.indexOf(currentFilter)
	)
	const router = useRouter()
	const pathname = usePathname()

	const createFilterURL = (pageNumber: number | string) => {
		const params = new URLSearchParams()
		params.set('filter', pageNumber.toString())
		return `${pathname}?${params.toString()}`
	}

	const changeTabHandle = (newFilter: SetStateAction<number>) => {
		if (typeof newFilter === 'number') {
			router.push(createFilterURL(tabOptions[newFilter].id), { scroll: false })
		}

		console.log(typeof newFilter)
		setFilter(newFilter)
	}

	return (
		<AnimatedTabs
			tabs={tabOptions}
			valueFromProps={filter}
			onChangeFromProps={changeTabHandle}
		/>
	)
}
