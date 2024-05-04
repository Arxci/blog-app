'use client'

import * as React from 'react'

import Link from 'next/link'

import { Comment, Dislike, Like, Post } from '@prisma/client'
import {
	QueryObserverResult,
	RefetchOptions,
	useQuery,
} from '@tanstack/react-query'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

import { Icons } from '@/components/icons'
import { PostItem } from '@/components/post/post-item'
import { FeaturedPost } from '@/components/post/featured-post'

import { cn } from '@/lib/utils'

import { getPosts } from '@/app/_server/actions/post'

interface HomeTabListProps {
	initialData: {
		popularPosts: Array<
			Post & { comments: Comment[]; likes: Like[]; dislikes: Dislike[] }
		>
		newPosts: Array<
			Post & { comments: Comment[]; likes: Like[]; dislikes: Dislike[] }
		>
		mostViewedPosts: Array<
			Post & { comments: Comment[]; likes: Like[]; dislikes: Dislike[] }
		>
	}
	initialTab: string
}

interface TabIconsProps {
	className?: string
	isActive: boolean
}

const TabIcons = {
	popular: (props: TabIconsProps) => (
		<Icons.flame
			className={cn(
				'fill-red-500 text-red-500 z-10 relative',
				!props.isActive
					? 'text-muted-foreground fill-muted-foreground'
					: undefined,
				props.className
			)}
		/>
	),
	new: (props: TabIconsProps) => (
		<Icons.circlePlus
			className={cn(
				'text-blue-500 z-10 relative',
				!props.isActive ? 'text-muted-foreground ' : undefined,
				props.className
			)}
		/>
	),
	mostViewed: (props: TabIconsProps) => (
		<Icons.trendingUp
			className={cn(
				'fill-green-500 text-green-500 z-10 relative',
				!props.isActive
					? 'text-muted-foreground fill-muted-foreground'
					: undefined,
				props.className
			)}
		/>
	),
}

export const DisplayPosts = ({
	initialData,
	initialTab = 'popular',
}: HomeTabListProps) => {
	const [currentTab, setCurrentTab] = React.useState<string>(initialTab)
	const { data, refetch } = useQuery({
		queryKey: ['posts'],
		queryFn: async () => await getPosts(),
		initialData: initialData,
	})

	if (!data) return

	const featuredPosts = data.newPosts.filter((post) => post.isFeatured)

	return (
		<Tabs
			value={currentTab}
			onValueChange={setCurrentTab}
		>
			<h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 font-bold">
				Stay Ahead of the Curve: Explore the Latest in Popular, New, and Most
				Viewed Posts!
			</h2>
			<TabsList className="space-x-1 rounded-full">
				<HomeTabTrigger
					value="popular"
					label="Popular"
					isActive={currentTab === 'popular'}
				/>
				<HomeTabTrigger
					value="new"
					label="New"
					isActive={currentTab === 'new'}
				/>
				<HomeTabTrigger
					value="mostViewed"
					label="Most Viewed"
					isActive={currentTab === 'mostViewed'}
				/>
			</TabsList>
			<Separator className="mb-4 mt-4" />
			<div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-10 pb-6">
				<div className="col-span-2 space-y-6">
					<TabsContent value="popular">
						<PostList
							list={data.popularPosts}
							refetch={refetch}
						/>
					</TabsContent>
					<TabsContent value="new">
						<PostList
							list={data.newPosts}
							refetch={refetch}
						/>
					</TabsContent>
					<TabsContent value="mostViewed">
						<PostList
							list={data.mostViewedPosts}
							refetch={refetch}
						/>
					</TabsContent>
					<Button
						radius="full"
						className="w-full"
						asChild
					>
						<Link href={'/blog'}>See more</Link>
					</Button>
				</div>
				<div className="flex flex-col">
					<h3 className="font-semibold text-xl md:text-2xl lg:text-3xl mb-6">
						Featured Posts
					</h3>
					<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 pb-4">
						{featuredPosts.map((post) => (
							<li key={post.slug}>
								<FeaturedPost {...post} />
							</li>
						))}
					</ul>
				</div>
			</div>
		</Tabs>
	)
}

type HomeTabTriggerProps = React.ComponentProps<typeof TabsTrigger> & {
	label: string
	isActive: boolean
	value: keyof typeof TabIcons
}

const HomeTabTrigger: React.FC<HomeTabTriggerProps> = ({
	value,
	label,
	isActive,
}) => {
	const Icon = TabIcons[value]

	return (
		<TabsTrigger
			value={value}
			className="relative px-2 sm:px-3 rounded-full text-muted-foreground flex gap-1 transition-none "
		>
			<Icon isActive={isActive} />
			<span className="z-10 relative font-bold ">{label}</span>
		</TabsTrigger>
	)
}

const PostList = ({
	list,
	refetch,
}: {
	list: Array<
		Post & { comments: Comment[]; likes: Like[]; dislikes: Dislike[] }
	>
	refetch: (
		options?: RefetchOptions | undefined
	) => Promise<QueryObserverResult>
}) => {
	return (
		<ul className="flex flex-col gap-4 mb-6 lg:mb-0 ">
			{list.slice(0, 5).map((post) => (
				<li key={post.slug}>
					<PostItem
						{...post}
						refetch={refetch}
					/>
				</li>
			))}
		</ul>
	)
}

/*

*/
