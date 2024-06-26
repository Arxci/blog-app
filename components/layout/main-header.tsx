import { DesktopNav } from './desktop-nav'
import { MobileNav } from './mobile-nav'

export const MainHeader = () => {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container h-14 flex items-center">
				<DesktopNav />
				<MobileNav />
			</div>
		</header>
	)
}
