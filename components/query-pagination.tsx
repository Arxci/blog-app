'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationPrevious,
	PaginationNext,
	PaginationEllipsis,
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

	const siblingCount = 0

	const createPageURL = (pageNumber: number | string) => {
		const params = new URLSearchParams(searchParams)
		params.set('page', pageNumber.toString())
		return `${pathname}?${params.toString()}`
	}

	const paginationItems = []

	if (1 < currentPage - siblingCount) {
		paginationItems.push(
			<PaginationLinkItem
				currentPage={currentPage}
				index={1}
				key={1}
				createPageURL={createPageURL}
			/>
		)

		if (siblingCount + 3 < currentPage) {
			paginationItems.push(<PaginationEllipsis key={'page-start'} />)
		} else if (siblingCount + 2 < currentPage) {
			paginationItems.push(
				<PaginationLinkItem
					currentPage={currentPage}
					index={2}
					key={2}
					createPageURL={createPageURL}
				/>
			)
		}
	}

	for (
		// is current page to close to first page?
		let ii = 0 < currentPage - siblingCount ? currentPage - siblingCount : 1;
		ii < currentPage;
		ii++
	) {
		paginationItems.push(
			<PaginationLinkItem
				currentPage={currentPage}
				index={ii}
				key={ii}
				createPageURL={createPageURL}
			/>
		)
	}

	// get siblingCount after
	for (
		let ii = currentPage;
		// is end of increment greater than or equal to the total number of pages?
		//prettier-ignore
		ii <=
		((totalPages >= currentPage + siblingCount)
			? (currentPage + siblingCount)
			: totalPages);
		ii++
	) {
		paginationItems.push(
			<PaginationLinkItem
				currentPage={currentPage}
				key={ii}
				index={ii}
				createPageURL={createPageURL}
			/>
		)
	}

	if (totalPages > currentPage + siblingCount) {
		if (totalPages - siblingCount - 2 > currentPage) {
			paginationItems.push(<PaginationEllipsis key={'page-end'} />)
		} else if (totalPages - siblingCount - 1 > currentPage) {
			paginationItems.push(
				<PaginationLinkItem
					currentPage={currentPage}
					index={totalPages - 1}
					key={totalPages - 1}
					createPageURL={createPageURL}
				/>
			)
		}
		paginationItems.push(
			<PaginationLinkItem
				currentPage={currentPage}
				index={totalPages}
				key={totalPages}
				createPageURL={createPageURL}
			/>
		)
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
				<div className="hidden sm:flex">
					{paginationItems.map((item) => item)}
				</div>

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
