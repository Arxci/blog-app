import { Dispatch, SetStateAction, createContext } from 'react'

export interface FiltersContextProps {
	activeFilter: number
	setActiveFilter: Dispatch<SetStateAction<number>>
}

export const FiltersContext = createContext<FiltersContextProps>({
	activeFilter: 0,
	setActiveFilter: () => {},
})
