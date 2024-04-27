import { MainHeader } from '@/components/layout/main-header'

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <div>{children}</div>
}
