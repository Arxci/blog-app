import Image from 'next/image'

import { SearchBar } from '@/components/search/search-bar'

export default function HomePage() {
	return (
		<main>
			<div className="container relative w-full h-[400px] overflow-hidden">
				<Image
					fill
					className="object-cover"
					priority
					quality={50}
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
					src="/images/home/home-banner.jpg"
					alt="Banner"
				/>
				<div className="absolute bg-black/40 w-full h-full top-0 left-0" />
			</div>
			<SearchBar />
		</main>
	)
}
