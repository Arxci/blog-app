'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationPrevious,
	PaginationNext,
} from '../../../components/ui/pagination'

interface QueryPaginationProps {
	totalPages: number
	className?: string
	currentPage: number
	onPageChanged: (newPage: number) => void
}

export function QueryPagination({
	totalPages,
	className,
	currentPage,
	onPageChanged,
}: QueryPaginationProps) {
	const prevPage = currentPage - 1
	const nextPage = currentPage + 1

	return (
		<Pagination className={className}>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						isActive={prevPage >= 1}
						className="cursor-pointer"
						onClick={() => onPageChanged(prevPage)}
					/>
				</PaginationItem>

				<PaginationItem>
					<PaginationNext
						isActive={nextPage <= totalPages}
						className="cursor-pointer"
						onClick={() => onPageChanged(nextPage)}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}
