import { fetchProducts } from '@/api/bo/collection'
import { Faq } from '@/components/faq'
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from '@/components/ui/carousel'
import { CustomImage } from '@/components/ui/image'
import { ParseHtml } from '@/components/ui/parse-html'
import { ShowMore } from '@/components/ui/show-more'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { ProductPromo } from '../../category/components/product-promos'
import { ProductTabs } from '../components/tabs'
import ContactFormWithProduct from '../components/contactForm'

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

export default async function ProductPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
	const { locale, id } = await params

	const translate = await getTranslations('products')

	const products = await fetchProducts(fetch, {
		locale,
		fields:
			'*,*.*.*',
		filter: {
			id: {
				_eq: id,
			},
		},
	})
	const product = products?.data?.[0]

	if (!product) notFound()

	return (
		<main className='lg:w-[90%] lg:mx-auto max-w-screen-xl flex flex-col lg:grid lg:grid-cols-[1.5fr_1fr] gap-5 lg:gap-10 min-h-screen lg:py-10 font-[family-name:var(--font-geist-sans)]'>
			<section className='relative flex flex-col gap-4'>
				<div className='absolute top-4 start-4 z-10 max-w-sm'>
					<ProductPromo product={product} />
				</div>
				<Carousel
					opts={{
						breakpoints: {
							'(min-width: 1024px)': { active: false },
						},
					}}
				>
					<CarouselContent className='lg:grid lg:grid-cols-2 lg:gap-2 lg:m-0'>
						{product?.images?.length > 0 &&
							product?.images.map((image) => (
								<CarouselItem
									key={image?.directus_files_id?.id}
									className='relative w-full basis-full h-[400px] lg:rounded-[1.5rem] lg:overflow-hidden lg:[&:nth-child(3n)]:col-span-2'
								>
									<CustomImage src={image?.directus_files_id?.id} alt={product?.title} className='object-cover' fill />
								</CarouselItem>
							))}
					</CarouselContent>
					<CarouselDots className='flex lg:hidden relative -translate-y-[170%]' />
				</Carousel>
			</section>
			<section className='relative flex flex-col gap-5 lg:row-span-8 w-[90%] lg:w-full mx-auto'>
				<div className='sticky top-[4.438rem] z-10 flex flex-col gap-3'>
					{/* <h1 className='text-[#02267E] text-3xl font-semibold'>{product?.title}</h1>
					<div className='flex flex-row flex-nowrap items-center gap-3'>
						<span className='text-base'>{translate('startFrom')}</span>
						<p className='text-primary font-semibold'>{minProductPrice(product)}DH</p>
					</div> */}
					
					<ProductTabs product={product} />
					{/* <ContactForm/> */}
					<ContactFormWithProduct productId={product?.id.toString()} />
					{/* <Link
						href={`/product/${id}/sub-products`}
						className={buttonVariants({
							class: 'w-max px-10',
						})}
					>
						<ArrowRightIcon />
					</Link> */}
				</div>
			</section>
			{product?.details && (
				<section className='w-[90%] mx-auto lg:w-full flex flex-col gap-5 rounded-lg p-5 bg-[#E6E8F5]'>
					<ShowMore className='max-h-[250px] '>
						<ParseHtml
							html={
								product?.details ||
								`<b>Types of albums and materials:&nbsp;</b><br><br><b>Soft cover album&nbsp;</b><ul><li>Format: 20.5 cm x 26.5 cm&nbsp;</li><li>Soft and glossy cover, with standard soft opening&nbsp;</li><li>Printed on premium&nbsp;Silver Digital 170g paper&nbsp;</li><li>Glossy finish available to make your memories really shine</li></ul><br><b>Hard cover album</b><br><ul><li>Format: 21 cm x 27 cm&nbsp;</li><li>Hard cover (photo book effect), matte or glossy, with standard soft opening </li><li>Printed on premium Silver Digital 170g paper &nbsp;</li><li>Glossy finish available to make your memories really shine&nbsp;</li></ul><br><b>Layflat album&nbsp;</b><br><ul><li>Format: 21 cm x 27 cm&nbsp;</li><li>Hard and glossy cover album, with bound pages for a flat open that allows the printing of your photos on a double page&nbsp;</li><li>Printing on high quality photographic paper (for a very high quality photo)&nbsp;</li><li>Glossy finish available </li></ul><br>All our photo albums are produced with an extra strong glue with a lifetime guarantee so that your album will be passed on from generation to generation. <br>All our photo books are certified FSC® Mix 70%, a label that promotes responsible forest management, and are printed in Europe in our Factory 🇪🇺. <br>&nbsp;<b>Page format and customisation</b><br><br><b>All our photo albums have a customisable layout:&nbsp;</b><br><ul><li>Customisation of the album cover (choice of colour, photo shape, possibility of adding a title) </li>&nbsp;<li>Numerous photo layouts available, to give your album rhythm&nbsp;</li><li>Text can be added on some layouts to tell all your stories&nbsp;</li><li>Auto-fill available for those in a hurry: you select your photos, we fill your album in one click.&nbsp;</li></ul><br>Choose a type of portrait album, one of the Cheerz photo album covers, collect your best photos and create your own photo book as you wish! <br>&nbsp;<b>Soft &amp; Hard Cover Albums </b><ul><li>From 24 to 96 soft pages &nbsp;</li><li>Can contain from 24 to 864 photos </li>&nbsp;<li>1 to 9 photos per page with defined layouts for optimal rendering (37 layouts available, with or without text)&nbsp;</li></ul>&nbsp;<br><b>Layflat Album&nbsp;</b><ul><li>From 24 to 96 pages bouind pages for a flat opening to showcase your photo on a double page&nbsp;</li><li>Can contain from 12 to 384 photos&nbsp;</li><li>1 to 8 photos per page with defined layouts for optimal rendering (32 layouts available, with or without text)</li><li>Option to print a photo on a double page</li>&nbsp;</ul>&nbsp;&nbsp;<br>&nbsp;<br><b>Online design and conception</b>It is a perfect narrative album that brings together your family, holiday or landscape photos in an original way.<br>&nbsp;Our online design tool offers an infinite number of options for customising your portrait photo book from start to finish, from the layout style to the font of the text and even the choice of background. &nbsp;<br>This allows you to give free rein to your creativity and create a unique portrait photo book! <br>To ensure its longevity and to avoid wear and tear, we've opted for quality materials. In addition, to enhance the purity and colour quality of your beautiful photos, we have provided you with two choices of high quality photo paper. <br><b>The little plus:&nbsp;</b>Perfect for collecting all your memories, elected most beautiful book of your library! <b>The big plus :</b>&nbsp;All our products are printed in France in our Factory 🇫🇷`
							}
						/>
					</ShowMore>
				</section>
			)}
			{product?.faq && <Faq data={product?.faq || []} />}
		</main>
	)
}
