import { ClientSessionProvider } from './client-session-provider'

import { QueryProvider } from './query-provider'

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<ClientSessionProvider>
			<QueryProvider>{children}</QueryProvider>
		</ClientSessionProvider>
	)
}
