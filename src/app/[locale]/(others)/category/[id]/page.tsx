import { fetchCategories } from '@/api/bo/collection'
import { Faq } from '@/components/faq'
import { CustomImage } from '@/components/ui/image'
import { ParseHtml } from '@/components/ui/parse-html'
import { Link } from '@/i18n/routing'
import { minProductPrice } from '@/lib/utils'
import { getTranslations } from 'next-intl/server'
import { ProductPromo } from '../components/product-promos'

export async function generateStaticParams() {
	const locales = ['en', 'fr']
	const params: Record<string, string>[] = []
	for (const locale of locales) {
		const data = (
			await fetchCategories(fetch, {
				locale,
				fields: 'id',
			})
		)?.data
		if (data && data?.length > 0) for (const category of data) params.push({ locale, id: category?.id?.toString() })
	}
	return params
}

export default async function CategoryPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
	const { locale, id } = await params

	const translate = await getTranslations('products')

	const data = await fetchCategories(fetch, {
		locale,
		fields:`id,avatar,title,products.id,products.title,products.avatar`,
		filter: {
			id: {
				_eq: id,
			},
		},
	})

	const category = data?.data?.[0]
	const products = category?.products
	const faq = category?.faq
//test
	return (
		<main className='w-[90%] max-w-screen-md flex flex-col items-center min-h-screen py-10 gap-10 lg:gap-16 font-[family-name:var(--font-geist-sans)] mx-auto'>
			<header className='flex flex-col gap-5 text-center'>
				<h1 className='text-2xl font-semibold text-primary'>{category?.title}</h1>
				{category?.description && <ParseHtml html={category.description} />}
			</header>
			<section className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
				{products &&
					products?.length > 0 &&
					products.map((product) => (
						<Link
							key={product?.id}
							href={product?.id ? `/product/${product?.id}` : '#'}
							className='min-w-[21.875rem] flex flex-col gap-4 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300'
						>
							<div className='relative w-full h-[350px] bg-muted overflow-hidden'>
								<div className='absolute top-4 start-4 z-10'>
									<ProductPromo product={product} />
								</div>
								<CustomImage src={product?.avatar} alt={product?.title} className='object-cover' fill />
							</div>
							<header className='flex flex-col p-4 gap-5'>
								<div className='flex flex-nowrap justify-between items-center gap-4'>
									<h3 className='text-lg font-semibold'>{product?.title}</h3>
									<div className='flex flex-col items-end'>
										<span className='text-xs'>{translate('startFrom')}</span>
										<p className='text-primary font-semibold'>Sur devis</p>
									</div>
								</div>
								{product?.description && <ParseHtml html={product.description} />}
							</header>
						</Link>
					))}
			</section>
			{faq && <Faq data={faq} />}
		</main>
	)
}
