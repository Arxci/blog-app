import {
	CirclePlus,
	Component,
	Flame,
	Menu,
	Moon,
	Search,
	SlidersHorizontal,
	Sun,
	TrendingUpIcon,
	X,
	CalendarDays,
	MessageCircle,
	ThumbsDown,
	ThumbsUp,
	TriangleAlert,
	Eye,
	EyeOff,
	Dot,
} from 'lucide-react'

import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

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
	eyeSlash: (props: IconProps) => (
		<EyeOff
			{...props}
			className={cn('w-4 h-4', props.className)}
		/>
	),
	eye: (props: IconProps) => (
		<Eye
			{...props}
			className={cn('w-4 h-4', props.className)}
		/>
	),
	dot: (props: IconProps) => (
		<Dot
			{...props}
			className={cn('w-4 h-4', props.className)}
		/>
	),
	triangleAlert: (props: IconProps) => (
		<TriangleAlert
			{...props}
			className={cn('w-4 h-4', props.className)}
		/>
	),
	google: (props: IconProps) => (
		<FcGoogle
			{...props}
			className={cn('w-4 h-4', props.className)}
		/>
	),
	github: (props: IconProps) => (
		<FaGithub
			{...props}
			className={cn('w-4 h-4', props.className)}
		/>
	),
	message: (props: IconProps) => (
		<MessageCircle
			{...props}
			className={cn('w-4 h-4', props.className)}
		/>
	),
	like: (props: IconProps) => (
		<ThumbsUp
			{...props}
			className={cn('w-4 h-4', props.className)}
		/>
	),
	dislike: (props: IconProps) => (
		<ThumbsDown
			{...props}
			className={cn('w-4 h-4', props.className)}
		/>
	),
	calendar: (props: IconProps) => (
		<CalendarDays
			{...props}
			className={cn('w-4 h-4', props.className)}
		/>
	),
	logo: (props: IconProps) => (
		<Component
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
	hamburger: (props: IconProps) => (
		<Menu
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
	filter: (props: IconProps) => (
		<SlidersHorizontal
			{...props}
			className={cn('w-4 h-4', props.className)}
		/>
	),
}
