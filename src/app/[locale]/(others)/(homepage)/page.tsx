import { fetchCategories, fetchFaqs, fetchProjects } from '@/api/bo/collection'
import { FaqHomepage } from './components/faq'
import { HomepageProducts } from './components/products'
import { HomepageSlider } from './components/slider'

async function getHomepageContent(locale: string) {
	const data = await fetchCategories(fetch, {
		locale,
		fields:'id,avatar,title,products.id,products.title,products.avatar',
		sort: 'order',
	})
	return data?.data || []
}

async function getProjects(locale: string) {
	const data = await fetchProjects(fetch, {
		locale,
		fields:
			'id,avatar,title,color,short_description',
		sort: 'order',
	})
	return data?.data || []
}

export function generateStaticParams() {
	return [{ locale: 'en' }, { locale: 'fr' }]
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
	const locale = (await params)?.locale
	const [categories, faqData, projects] = await Promise.all([getHomepageContent(locale), fetchFaqs(fetch, { locale, fields: '*' }), getProjects(locale)])


	return (
		<main className='w-[90%] max-w-screen-xl flex flex-col items-center min-h-screen py-10 gap-10 lg:gap-16 font-[family-name:var(--font-geist-sans)] mx-auto'>
			<HomepageSlider data={projects} />
			<HomepageProducts data={categories} />
			<FaqHomepage data={faqData?.data || []} />
		</main>
	)
}
