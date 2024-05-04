import { Icons } from '@/components/icons'

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
	siteMap: [
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
		{
			name: 'Sign Up',
			href: '/sign-up',
		},
		{
			name: 'Sign In',
			href: '/sign-in',
		},
	],
	socials: [
		{
			name: 'Portfolio',
			href: 'https://garretthumbert.org/',
			icon: Icons['monitor'],
		},
		{
			name: 'LinkedIn',
			href: '#',
			icon: Icons['linkedIn'],
		},
		{
			name: 'Twitter',
			href: '#',
			icon: Icons['twitter'],
		},
	],
}

export type SiteConfigType = typeof siteConfig
