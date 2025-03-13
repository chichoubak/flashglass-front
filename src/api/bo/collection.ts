import { translateAnyObject } from '@/lib/utils'
import { CategoryType, FaqType, ProductType } from '@/types/collection'
import { BO_BASE_URL } from '.'
import { FetchCollectionsParams } from './types'

export async function fetchCategories(fetcher: typeof fetch, params: FetchCollectionsParams) {
	try {
		const { locale } = params

		const searchParams = new URLSearchParams({})
		if (params.fields) searchParams.append('fields[]', params.fields)
		if (params.sort) searchParams.append('sort', params.sort)
		if (params.filter) {
			searchParams.append('filter', JSON.stringify({ ...params.filter, status: 'published' }))
		} else searchParams.append('filter', JSON.stringify({ status: 'published' }))
		const response = await fetcher(`${BO_BASE_URL}/items/category?${searchParams.toString()}`, {
			headers: {
				'Content-Type': 'application/json',
			},
			cache: 'force-cache',
			next: {
				tags: ['collection', 'collection-categories'],
			},
		})
		const data = (await response.json())?.data as CategoryType[]

		return { data: translateAnyObject(data, locale) }
	} catch (error) {
		console.error('[ERROR] fetchCategories', error)
		return { error }
	}
}

export async function fetchProjects(fetcher: typeof fetch, params: FetchCollectionsParams) {
	try {
		const { locale } = params

		const searchParams = new URLSearchParams({})
		if (params.fields) searchParams.append('fields[]', params.fields)
		if (params.sort) searchParams.append('sort', params.sort)
		if (params.filter) {
			searchParams.append('filter', JSON.stringify({ ...params.filter, status: 'published' }))
		} else searchParams.append('filter', JSON.stringify({ status: 'published' }))
		const response = await fetcher(`${BO_BASE_URL}/items/project?${searchParams.toString()}`, {
			headers: {
				'Content-Type': 'application/json',
			},
			cache: 'force-cache',
			next: {
				tags: ['collection', 'collection-categories'],
			},
		})
		const data = (await response.json())?.data as CategoryType[]

		return { data: translateAnyObject(data, locale) }
	} catch (error) {
		console.error('[ERROR] fetchCategories', error)
		return { error }
	}
}

export async function fetchProducts(fetcher: typeof fetch, params: FetchCollectionsParams) {
	try {
		const { locale } = params

		const searchParams = new URLSearchParams({})
		if (params.fields) searchParams.append('fields[]', params.fields)
		if (params.sort) searchParams.append('sort', params.sort)
		if (params.filter) {
			searchParams.append('filter', JSON.stringify({ ...params.filter, status: 'published' }))
		} else searchParams.append('filter', JSON.stringify({ status: 'published' }))
		const response = await fetcher(`${BO_BASE_URL}/items/product?${searchParams.toString()}`, {
			headers: {
				'Content-Type': 'application/json',
			},
			cache: 'force-cache',
			next: {
				tags: ['collection', 'collection-products'],
			},
		})

		const data = (await response.json())?.data as ProductType[]
		return { data: translateAnyObject(data, locale) } 
	} catch (error) {
		console.error('[ERROR] fetchProducts', error)
		return { error }
	}
}

export async function fetchSubProducts(fetcher: typeof fetch, params: FetchCollectionsParams) {
	try {
		const { locale } = params

		const searchParams = new URLSearchParams({})
		if (params.fields) searchParams.append('fields[]', params.fields)
		if (params.sort) searchParams.append('sort', params.sort)
		if (params.filter) {
			searchParams.append('filter', JSON.stringify({ ...params.filter, status: 'published' }))
		} else searchParams.append('filter', JSON.stringify({ status: 'published' }))
		const response = await fetcher(`${BO_BASE_URL}/collection/sub_product?${searchParams.toString()}`, {
			headers: {
				'Content-Type': 'application/json',
			},
			cache: 'force-cache',
			next: {
				tags: ['collection', 'collection-sub-products'],
			},
		})
		const data = (await response.json())?.data as ProductType[]
		return { data: translateAnyObject(data, locale) }
	} catch (error) {
		console.error('[ERROR] fetchSubProducts', error)
		return { error }
	}
}

export async function fetchFaqs(fetcher: typeof fetch, params: FetchCollectionsParams) {
	try {
		const { locale } = params

		const searchParams = new URLSearchParams({})
		if (params.fields) searchParams.append('fields[]', params.fields)
		if (params.sort) searchParams.append('sort', params.sort)
		if (params.filter) {
			searchParams.append('filter', JSON.stringify({ ...params.filter, status: 'published' }))
		}
		else searchParams.append('filter', JSON.stringify({ status: 'published' }))
		const response = await fetcher(`${BO_BASE_URL}/items/faq?${searchParams.toString()}`, {
			headers: {
				'Content-Type': 'application/json',
			},
			cache: 'force-cache',
			next: {
				tags: ['collection', 'collection-faqs'],
			},
		})
		const data = (await response.json())?.data as FaqType[]
		return { data: translateAnyObject(data, locale) }
	} catch (error) {
		console.error('[ERROR] fetchFaqs', error)
		return { error }
	}
}
