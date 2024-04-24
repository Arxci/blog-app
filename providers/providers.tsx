import { FiltersProvider } from './filters-provider'

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return <FiltersProvider>{children}</FiltersProvider>
}
