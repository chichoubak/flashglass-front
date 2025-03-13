import { fetchCategories } from '@/api/bo/collection'

export async function getLayoutContent(locale: string) {
	const data = await fetchCategories(fetch, {
		locale,
		fields: 'id,avatar,title,products.id,products.title,products.avatar',
		sort: 'order',
	})

	return data?.data || []
}
