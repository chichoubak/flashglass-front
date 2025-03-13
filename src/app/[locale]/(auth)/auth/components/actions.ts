'use server'

import { fetchLogin } from '@/api/bo/auth'
import { redirect } from '@/i18n/routing'
import { setSessionTokenCookie } from '@/lib/sessions'
import { getLocale } from 'next-intl/server'

export async function loginAction(email: string, password: string) {
	const locale = await getLocale()
	const response = await fetchLogin(fetch, {
		email,
		password,
	})
	if (response?.data?.access_token) {
		setSessionTokenCookie(response.data.access_token, response.data.refresh_token, response?.data?.expires)
		redirect({
			href: '/',
			locale,
		})
	}
	return response
}
