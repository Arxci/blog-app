//client-session-provider.tsx
'use client'

import { SessionProvider } from 'next-auth/react'

export function ClientSessionProvider({
	children,
}: {
	children: React.ReactNode
}) {
	return <SessionProvider>{children}</SessionProvider>
}