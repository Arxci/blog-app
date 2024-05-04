import { ClientSessionProvider } from './client-session-provider'

import { QueryProvider } from './query-provider'
import { ThemeProvider } from './theme-provider'

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<ClientSessionProvider>
			<QueryProvider>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					{children}
				</ThemeProvider>
			</QueryProvider>
		</ClientSessionProvider>
	)
}
