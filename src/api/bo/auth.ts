import { BO_BASE_URL } from '.'
import {
	FetchCheckOTPPayload,
	FetchForgetPasswordPayload,
	FetchLoginPayload,
	FetchLoginResponse,
	FetchRegisterPayload,
	FetchUpdatePasswordPayload,
	GlobalSuccessResponse,
} from './types'

export async function fetchRefreshToken(fetcher: typeof fetch, payload: { refresh_token: string }) {
	try {
		const response = await fetcher(`${BO_BASE_URL}/auth/refresh`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		})
		const data = (await response.json()) as FetchLoginResponse
		return { data }
	} catch (error) {
		console.error('[ERROR] fetchLogin', error)
		return { error }
	}
}

export async function fetchLogin(fetcher: typeof fetch, payload: FetchLoginPayload) {
	try {
		const response = await fetcher(`${BO_BASE_URL}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		})
		const data = (await response.json()) as FetchLoginResponse
		return { data }
	} catch (error) {
		console.error('[ERROR] fetchLogin', error)
		return { error }
	}
}

export async function fetchRegister(fetcher: typeof fetch, payload: FetchRegisterPayload) {
	try {
		const response = await fetcher(`${BO_BASE_URL}/auth/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		})
		const data = (await response.json()) as GlobalSuccessResponse
		return { data }
	} catch (error) {
		console.error('[ERROR] fetchRegister', error)
		return { error }
	}
}

export async function fetchForgetPassword(fetcher: typeof fetch, payload: FetchForgetPasswordPayload) {
	try {
		const response = await fetcher(`${BO_BASE_URL}/auth/forgetPassword`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		})
		const data = (await response.json()) as GlobalSuccessResponse
		return { data }
	} catch (error) {
		console.error('[ERROR] fetchForgetPassword', error)
		return { error }
	}
}

export async function fetchUpdatePassword(fetcher: typeof fetch, payload: FetchUpdatePasswordPayload) {
	try {
		const response = await fetcher(`${BO_BASE_URL}/auth/resetPassword`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		})
		const data = (await response.json()) as GlobalSuccessResponse
		return { data }
	} catch (error) {
		console.error('[ERROR] fetchForgetPassword', error)
		return { error }
	}
}

export async function fetchResendOTP(fetcher: typeof fetch, payload: { email: string }) {
	try {
		const response = await fetcher(`${BO_BASE_URL}/auth/resendEmailOtp`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		})
		const data = (await response.json()) as GlobalSuccessResponse
		return { data }
	} catch (error) {
		console.error('[ERROR] fetchResendOtp', error)
		return { error }
	}
}

export async function fetchCheckOTP(fetcher: typeof fetch, payload: FetchCheckOTPPayload) {
	try {
		const response = await fetcher(`${BO_BASE_URL}/auth/verifyOtp`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		})
		const data = (await response.json()) as GlobalSuccessResponse
		return { data }
	} catch (error) {
		console.error('[ERROR] fetchCheckOtp', error)
		return { error }
	}
}

export async function createRequest(fetcher: typeof fetch, payload: { first_name: string, last_name: string, email: string, phone: string, description?: string, product?: string }) {
	try {
		const response = await fetcher(`${BO_BASE_URL}/items/request`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		})
		const data = (await response.json()) as FetchLoginResponse
		return { data }
	} catch (error) {
		console.error('[ERROR] create request', error)
		return { error }
	}
}