import { ClientSessionProvider } from './client-session-provider'
import { FiltersProvider } from './filters-provider'
import { QueryProvider } from './query-provider'

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<ClientSessionProvider>
			<QueryProvider>
				<FiltersProvider>{children}</FiltersProvider>
			</QueryProvider>
		</ClientSessionProvider>
	)
}
