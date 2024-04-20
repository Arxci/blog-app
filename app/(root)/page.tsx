import Image from 'next/image'

import { posts } from '#site/content'

import { Separator } from '@/components/ui/separator'

import { PostItem } from '@/components/post-item'
import { SearchInput } from '@/components/search-input'
import { SearchFilters } from '@/components/tab-filters'
import { PageSectionContainer } from '@/components/page-section-container'

import { sortPosts } from '@/lib/utils'

export default async function HomePage() {
	const sortedPost = sortPosts(posts.filter((post) => post.published))

	const displayPosts = sortedPost

	return (
		<main className="bg-background">
			<PageSectionContainer className="relative w-full mb-14 h-[400px] overflow-hidden md:rounded-b-lg">
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
					<SearchFilters />
				</div>
				<Separator className="mb-4 mt-1" />
				<ul className="flex flex-col">
					{displayPosts.map((post) => (
						<li key={post.slug}>
							<PostItem {...post} />
						</li>
					))}
				</ul>
			</PageSectionContainer>
		</main>
	)
}
