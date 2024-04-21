import { NextResponse } from 'next/server'

import NextAuth from 'next-auth'

import authConfig from './auth.config'
import { DEFAULT_SIGNIN_REDIRECT, loginRoutes, protectedRoutes } from '@/routes'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
	const { nextUrl } = req
	const isSignedIn = !!req.auth

	if (protectedRoutes.includes(nextUrl.pathname) && !isSignedIn) {
		return NextResponse.redirect(new URL('/sign-in', nextUrl))
	}

	if (loginRoutes.includes(nextUrl.pathname) && isSignedIn) {
		return NextResponse.redirect(new URL(DEFAULT_SIGNIN_REDIRECT, nextUrl))
	}
})

export const config = {
	matcher: ['/settings', '/sign-in', '/sign-up'],
}
