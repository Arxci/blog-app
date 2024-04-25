'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationPrevious,
	PaginationNext,
} from './ui/pagination'

interface QueryPaginationProps {
	totalPages: number
	className?: string
}

export function QueryPagination({
	totalPages,
	className,
}: QueryPaginationProps) {
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const currentPage = Number(searchParams.get('page')) || 1

	const prevPage = currentPage - 1
	const nextPage = currentPage + 1

	const createPageURL = (pageNumber: number | string) => {
		const params = new URLSearchParams(searchParams)
		params.set('page', pageNumber.toString())
		return `${pathname}?${params.toString()}`
	}

	return (
		<Pagination className={className}>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						isActive={prevPage >= 1}
						href={createPageURL(prevPage)}
					/>
				</PaginationItem>

				<PaginationItem>
					<PaginationNext
						isActive={nextPage <= totalPages}
						className=""
						href={createPageURL(nextPage)}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}

const PaginationLinkItem = ({
	currentPage,
	index,
	createPageURL,
}: {
	currentPage: number
	index: number
	createPageURL: (pageNumber: number) => string | undefined
}) => {
	return (
		<PaginationItem>
			<PaginationLink
				isActive={currentPage === index}
				href={createPageURL(index)}
			>
				{index}
			</PaginationLink>
		</PaginationItem>
	)
}

/*

*/
