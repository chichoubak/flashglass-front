import { fetchProducts } from '@/api/bo/collection'
import { HomepageProduct } from '../(homepage)/components/products'
import { getTranslations } from 'next-intl/server';

export function generateStaticParams() {
	return [{ locale: 'en' }, { locale: 'fr' }]
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const translate = await getTranslations('homepage');

	const products = (
		await fetchProducts(fetch, {
			locale
		})
	)?.data
	return (
		<main className='w-[80%] max-w-screen-xl flex flex-col items-center min-h-screen py-10 gap-10 lg:gap-16 font-[family-name:var(--font-geist-sans)] mx-auto'>
<header className='flex flex-col gap-2'>
				<h2 className='text-4xl md:text-5xl !leading-none font-black tracking-tighter text-start lg:text-center text-primary'>{translate('products.title')}</h2>
				<p className='mt-1.5 text-lg text-muted-foreground text-start lg:text-center'>{translate('products.description')}</p>
			</header>
		<section className='w-full mx-auto flex flex-col gap-2 lg:gap-10'>

		<main className='flex flex-col lg:grid lg:grid-cols-6 gap-5 items-stretch w-full mx-auto'>
			{products &&
				products?.length > 0 &&
				products?.map((product) => (
					<HomepageProduct
						key={product.id}
						title={product?.title}
						description={product?.description}
						image={product?.avatar}
						link={product?.id ? `/product/${product?.id}` : '#'}
					/>
				))}
		</main>
		</section>
		</main>
	)
}
