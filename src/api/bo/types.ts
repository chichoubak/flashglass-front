export interface GlobalSuccessResponse {
	success: boolean
	message: string
}

export interface FetchLoginPayload {
	email: string
	password: string
}

export interface FetchLoginResponse {
	expires: number
	refresh_token: string
	access_token: string
	code?: number
	message?: string
}

export interface FetchRegisterPayload {
	email: string
	password: string
	last_name: string
	first_name: string
	birth_date: string
}

export interface FetchCheckOTPPayload {
	email: string
	otp: string
}

export interface FetchForgetPasswordPayload {
	email: string
	lang: string
}

export interface FetchUpdatePasswordPayload {
	token: string
	password: string
}

export interface FetchCollectionsParams {
	locale: string
	fields?: string
	sort?: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	filter?: Record<string, any>
}
