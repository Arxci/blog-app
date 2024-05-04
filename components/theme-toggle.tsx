'use client'

import { useTheme } from 'next-themes'
import { Icons } from './icons'

import { Button } from './ui/button'

export const ThemeToggle = () => {
	const { theme, setTheme } = useTheme()

	return (
		<Button
			variant="outline"
			radius="full"
			size="icon"
			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
		>
			<Icons.sun className="dark:scale-0" />
			<Icons.moon className="absolute scale-0 dark:rotate-0 dark:scale-100" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	)
}
