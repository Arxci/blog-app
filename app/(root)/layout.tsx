import { MainHeader } from '@/components/layout/main-header'

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
			<MainHeader />
			{children}
		</div>
	)
}
