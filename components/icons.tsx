import {
	CirclePlus,
	Flame,
	Moon,
	Search,
	Sun,
	TrendingUpIcon,
	X,
} from 'lucide-react'

import { cn } from '@/lib/utils'

export interface IconProps {
	className?: string
}

export const Icons = {
	sun: (props: IconProps) => (
		<Sun
			{...props}
			className={cn('w-4 h-4', props.className)}
		/>
	),
	moon: (props: IconProps) => (
		<Moon
			{...props}
			className={cn('w-4 h-4', props.className)}
		/>
	),
	spinner: (props: IconProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<path d="M21 12a9 9 0 1 1-6.219-8.56" />
		</svg>
	),
	search: (props: IconProps) => (
		<Search
			{...props}
			className={cn('w-4 h-4', props.className)}
		/>
	),
	cross: (props: IconProps) => (
		<X
			{...props}
			className={cn('w-4 h-4', props.className)}
		/>
	),
	flame: (props: IconProps) => (
		<Flame
			{...props}
			className={cn('w-4 h-4', props.className)}
		/>
	),
	trendingUp: (props: IconProps) => (
		<TrendingUpIcon
			{...props}
			className={cn('w-4 h-4', props.className)}
		/>
	),
	circlePlus: (props: IconProps) => (
		<CirclePlus
			{...props}
			className={cn('w-4 h-4', props.className)}
		/>
	),
}
