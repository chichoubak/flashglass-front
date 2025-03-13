import { fetchProducts } from '@/api/bo/collection'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { SubProductCard } from '../../components/sub-product-card'

export async function generateStaticParams() {
	const locales = ['en', 'fr']
	const params: Record<string, string>[] = []
	for (const locale of locales) {
		const data = (
			await fetchProducts(fetch, {
				locale,
				fields: 'id',
			})
		)?.data
		if (data && data?.length > 0) for (const product of data) params.push({ locale, id: product?.id?.toString() })
	}
	return params
}

export default async function SubProductsPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
	const { locale, id } = await params
	const translate = await getTranslations('products')
	const products = await fetchProducts(fetch, {
		locale,
		fields: 'sub_product.price,sub_product.short_description,sub_product.width,sub_product.height,sub_product.*,sub_product.translations.*',
		filter: {
			id: {
				_eq: id,
			},
		},
	})
	const product = products?.data?.[0]
	if (!product) notFound()
	return (
		<main className='w-[90%] mx-auto max-w-screen-xl flex flex-col gap-10 lg:gap-20 min-h-[80vh] py-10 font-[family-name:var(--font-geist-sans)]'>
			<h1 className='text-4xl font-semibold text-primary text-center'>{translate('chooseProduct')}</h1>
			<section className='flex flex-wrap gap-5 justify-center'>
				{product?.sub_product?.map((subProduct) => (
					<SubProductCard key={subProduct.id} subProduct={subProduct} />
				))}
			</section>
		</main>
	)
}
