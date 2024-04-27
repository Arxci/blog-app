import Image from 'next/image'

import { posts } from '#site/content'

import { getFilteredPosts } from '../_server/actions/post'

import { Separator } from '@/components/ui/separator'

import { PostItem } from '@/components/post-item'
import { SearchInput } from '@/app/(root)/_components/search-input'
import { TabFilters } from '@/app/(root)/_components/tab-filters'
import { PageSectionContainer } from '@/components/page-section-container'

import { FeaturedPost } from '@/components/featured-post'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface HomePageProps {
	searchParams: {
		filter: 'popular' | 'most-viewed' | 'new'
	}
}

export default async function HomePage({ searchParams }: HomePageProps) {
	const currentFilter = searchParams?.filter || 'popular'

	const sortedPost = await getFilteredPosts(currentFilter)

	const featuredPosts = posts
		.filter((post) => post.isFeatured && post.published)
		.slice(0, 2)

	return (
		<main>
			<PageSectionContainer className="relative w-full mb-14 h-[400px] overflow-hidden lg:rounded-b-lg">
				<Image
					fill
					className="object-cover object-bottom"
					priority
					quality={50}
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
					src="/images/home/home-banner.jpg"
					alt="Banner"
				/>
				<div className="absolute bg-black/40 w-full h-full top-0 left-0 supports-[backdrop-filter]:backdrop-blur-[2px]">
					<div className="container flex flex-col h-full justify-center gap-4 text-center">
						<h1 className="text-3xl text-white sm:text-5xl md:text-6xl lg:text-7xl font-black text-balance">
							Hello, I&apos;m Garrett
						</h1>
						<p className="max-w-[42rem] mx-auto text-white/90 text-lg sm:text-xl">
							Welcome to my blog site. Discover expert tips and tutorials on web
							development. Join our community and elevate your coding skills
							today!
						</p>
						<div className="max-w-[500px] w-full mx-auto">
							<SearchInput />
						</div>
					</div>
				</div>
			</PageSectionContainer>
			<PageSectionContainer>
				<h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 font-bold">
					Stay Ahead of the Curve: Explore the Latest in Popular, New, and
					Trending Posts!
				</h2>
				<div className="flex items-center gap-2 md:gap-4 h-14">
					<TabFilters currentFilter={currentFilter} />
				</div>
				<Separator className="mb-4 mt-1" />
				<div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-10 pb-6">
					<div className="col-span-2 space-y-6">
						<ul className="flex flex-col gap-4 mb-6 lg:mb-0 ">
							{sortedPost.map((post) => (
								<li key={post.slug}>
									<PostItem {...post} />
								</li>
							))}
						</ul>
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
			</PageSectionContainer>
		</main>
	)
}
