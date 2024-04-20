export const siteConfig = {
	name: 'Blog App',
	description: 'Blog app created with NextJS',
	url: 'https://example.com',
	author: 'Garrett Humbert',
	links: [
		{
			name: 'Home',
			href: '/',
		},
		{
			name: 'Blog',
			href: '/blog',
		},
		{
			name: 'About',
			href: '/about',
		},
	],
}

export type SiteConfigType = typeof siteConfig
