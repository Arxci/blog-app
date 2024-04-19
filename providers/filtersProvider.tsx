'use client'

import { FiltersContext, FiltersContextProps } from '@/store/filters-context'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export const FiltersProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const [activeFilter, setActiveFilter] = useState<number>(0)

	const filtersContext: FiltersContextProps = {
		activeFilter,
		setActiveFilter,
	}

	return (
		<FiltersContext.Provider value={filtersContext}>
			{children}
		</FiltersContext.Provider>
	)
}
