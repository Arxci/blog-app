import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface PageSectionContainerProps {
	className?: string
	children: ReactNode
}

export const PageSectionContainer = ({
	className,
	children,
}: PageSectionContainerProps) => {
	return <section className={cn('container', className)}>{children}</section>
}
