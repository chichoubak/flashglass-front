'use server'
import { fetchRefreshToken } from '@/api/bo/auth'
import { redirect } from '@/i18n/routing'
import { decodeJwt } from 'jose'
import { getLocale } from 'next-intl/server'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

export async function setSessionTokenCookie(accessToken: string, refreshToken: string, expires: number): Promise<void> {
	const cookieStore = await cookies()
	const accessTokenexpiresAt = new Date(Date.now() + expires)
	const refreshTokenexpiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 30 days
	cookieStore.set('accessToken', accessToken, {
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		expires: accessTokenexpiresAt,
		path: '/',
	})
	cookieStore.set('refreshToken', refreshToken, {
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		expires: refreshTokenexpiresAt,
	})
}

export async function deleteSessionTokenCookie(): Promise<void> {
	const cookieStore = await cookies()
	cookieStore.set('accessToken', '', {
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 0,
		path: '/',
	})
	cookieStore.set('refreshToken', '', {
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 0,
	})
}

export async function validateSession() {
	const cookieStore = await cookies()
	const accessToken = cookieStore.get('accessToken')?.value
	const refreshToken = cookieStore.get('refreshToken')?.value

	const decodedAccessToken = await decodeJwt(accessToken as string)
	const isExpired = decodedAccessToken.exp! < Date.now() / 1000

	if (isExpired) {
		if (refreshToken) {
			const response = await fetchRefreshToken(fetch, { refresh_token: refreshToken })
			if (response?.data?.access_token) {
				setSessionTokenCookie(response.data.access_token, response.data.refresh_token, response.data.expires)
				// Access token is not expired and refreshed successfully
				return true
			}
		}
	}
	// Access token is not expired
	else return true

	return false
}

export async function saveGoogleCredentialsToSession(request: NextRequest) {
	const url = new URL(request.url)
	if (url.searchParams?.has('access_token') && url.searchParams?.has('refresh_token') && url.searchParams?.has('expires')) {
		const accessToken = url.searchParams?.get('access_token')
		const refreshToken = url.searchParams?.get('refresh_token')
		const expires = Number(url.searchParams?.get('expires') as string)
		await setSessionTokenCookie(accessToken!, refreshToken!, expires)
		return true
	}
	return false
}

export async function checkAuthAction() {
	const cookieStore = await cookies()
	return Boolean(cookieStore.get('accessToken')?.value)
}

export async function logoutAction() {
	const locale = await getLocale()
	await deleteSessionTokenCookie()
	redirect({
		locale,
		href: '/',
	})
}
