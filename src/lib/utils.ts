import { DIRECTUS_LOCALES } from '@/constants/global'
import { ProductType } from '@/types/collection'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

interface GenerateImagePathParams {
	src?: string
}
export function generateImagePath(params: GenerateImagePathParams): string {
	if (!params.src) return ''
	return `${process.env.NEXT_PUBLIC_BO_BASEURL}/assets/${params.src}`
}

export function setClientCookie(name: string, value: string, expires?: string) {
	const date = new Date()
	date.setTime(date.getTime() + 1000 * 60 * 60 * 24 * 365)
	document.cookie = `${name}=${value}; expires=${expires ?? date.toISOString()}; path=/`
}

export function getClientCookie(name: string) {
	const value = `; ${document.cookie}`
	const parts = value.split(`; ${name}=`)
	if (parts.length === 2) return parts.pop()?.split(';').shift()
}

export function removeClientCookie(name: string) {
	document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function translateAnyObject<T extends any[]>(arr: T, locale: string) {
	if (!arr?.length || !Array.isArray(arr)) return arr
	arr?.forEach((obj, index) =>
		Object?.keys(obj).forEach((key) => {
			if (key === 'translations' && Array.isArray(obj[key])) {
				const translated = obj[key].find((translation) => translation.languages_code === DIRECTUS_LOCALES[locale as keyof typeof DIRECTUS_LOCALES])
				if (translated) arr[index] = { ...obj, ...translated, translations: [] }
			} else if (Array.isArray(obj[key])) {
				arr[index][key] = translateAnyObject(obj[key], locale)
			}
		})
	)
	return arr
}

export function minProductPrice(product: ProductType) {
	const prices = product?.sub_product?.map((subProduct) => subProduct.price) || []
	return Math.min(...prices)
}
