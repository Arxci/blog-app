import Image from 'next/image'

import { SearchInput } from '@/components/search-input'
import { PageSectionContainer } from '@/components/layout/page-section-container'

import { DisplayPosts } from './_components/display-posts'

import { getPosts } from '../_server/actions/post'

interface HomePageProps {
	searchParams: {
		tab: 'popular' | 'most-viewed' | 'new'
	}
}

export default async function HomePage({ searchParams }: HomePageProps) {
	const currentTab = searchParams?.tab || 'popular'

	const initialData = await getPosts()

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
				<DisplayPosts
					initialData={initialData}
					initialTab={currentTab}
				/>
			</PageSectionContainer>
		</main>
	)
}
