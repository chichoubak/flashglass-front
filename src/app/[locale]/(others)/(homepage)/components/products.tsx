import { buttonVariants } from '@/components/ui/button'
import { CustomImage } from '@/components/ui/image'
import { Link } from '@/i18n/routing'
import { ArrowRightIcon } from 'lucide-react'

import { ParseHtml } from '@/components/ui/parse-html'
import { CategoryType, ProductType } from '@/types/collection'
import { getTranslations } from 'next-intl/server'

interface HomepageProductProps {
	title: string
	description: string
	image: string
	link: string
	buttonLabel?: string
}

export function HomepageProduct(props: HomepageProductProps) {
	return (
		<Link
			href={props.link}
			className="w-full sm:w-full min-w-[300px] flex flex-col gap-4 rounded-[1.5rem] lg:rounded-[2rem] bg-white border hover:shadow hover:scale-[0.97] transition-transform duration-300 overflow-hidden col-span-2 shadow mx-auto"
			>
			<header className='flex flex-col py-4 lg:py-6 px-4 gap-3'>
				{props.title && <h2 className='text-xl font-semibold text-[#02267E]'>{props.title}</h2>}
				{props.description && <ParseHtml className='text-sm lg:text-lg' html={props.description} />}
			</header>
			<div className="relative w-full h-[200px] lg:h-[300px] rounded-tr-[2rem] lg:rounded-tr-[2.5rem] overflow-hidden bg-muted mt-auto">
			<CustomImage src={props.image} alt={props.title} className='object-cover' fill />
			</div>
		</Link>
	)
}

export async function HomepageProducts({ data }: { data: CategoryType[] }) {
	const translate = await getTranslations('homepage')
	const products: ProductType[] = []
	data.forEach((category) => {
		if (Array.isArray(category?.products)) {
			products.push(...category.products)
		}
	})
	
	const filteredProducts = products?.slice(0, 5)
	return (
		<section className='w-full mx-auto flex flex-col gap-2 lg:gap-10'>
			<header className='flex flex-col gap-2'>
				<h2 className='text-4xl md:text-5xl !leading-none font-black tracking-tighter text-start lg:text-center text-primary'>{translate('products.title')}</h2>
				<p className='mt-1.5 text-lg text-muted-foreground text-start lg:text-center'>{translate('products.description')}</p>
			</header>
			<div className="flex flex-col lg:grid lg:grid-cols-6 gap-5 items-stretch w-full mx-auto">
			{filteredProducts?.length > 0 &&
					filteredProducts.map((product) => (
						<HomepageProduct
							key={product?.id}
							title={product?.title}
							description={product?.description}
							image={product?.avatar}
							link={product?.id ? `/product/${product?.id}` : '#'}
							buttonLabel={translate('products.buyNow')}
						/>
					))}
			</div>
			<Link href='/products' className={buttonVariants({ variant: 'outline', class: 'w-fit mx-auto text-[1rem] h-12 mt-5 px-10', size: 'lg' })}>
				{translate('products.seeAll')}
				<ArrowRightIcon />
			</Link>
		</section>
	)
}
