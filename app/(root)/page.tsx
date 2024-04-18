import { PageContainer } from '@/components/layout/page-container'
import { SearchBar } from '@/components/search-bar'
import Image from 'next/image'

export default function HomePage() {
	return (
		<PageContainer>
			<div className="w-full h-[500px] overflow-hidden">
				<Image
					width={1920}
					height={1080}
					className="object-cover"
					src="/images/home/home-banner.jpg"
					alt="Banner"
				/>
			</div>
			<SearchBar />
		</PageContainer>
	)
}
