import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'
import { saveGoogleCredentialsToSession } from './lib/sessions'

export default async function middleware(request: NextRequest) {
	const url = new URL(request.url)
	// handle google authentification
	if (url?.pathname?.includes('/auth/google/callback')) {
		const isSaved = await saveGoogleCredentialsToSession(request)
		if (isSaved) {
			url.pathname = '/'
			url.search = ''
			return NextResponse.redirect(url)
		}
	}

	const handleI18nRouting = createMiddleware(routing)
	return handleI18nRouting(request)
}
export const config = {
	// Match only internationalized pathnames
	matcher: ['/', '/(fr|en)/:path*'],
}
