import Image from 'next/image'

import { SearchBar } from '@/components/search-bar'

export default function HomePage() {
	return (
		<main>
			<div className="container relative w-full h-[400px] overflow-hidden">
				<Image
					fill
					className="object-cover"
					priority
					quality={50}
					src="/images/home/home-banner.jpg"
					alt="Banner"
				/>
				<div className="absolute bg-black/40 w-full h-full top-0 left-0  supports-[backdrop-filter]:backdrop-blur-[1px]" />
			</div>
			<SearchBar />
		</main>
	)
}
