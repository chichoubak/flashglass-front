import { Footer } from '@/components/layout/footer'
import { NavDesktop } from '@/components/layout/nav/desktop'
import { getLayoutContent } from '@/components/layout/utils'

export function generateStaticParams() {
	return [{ locale: 'en' }, { locale: 'fr' }]
}

export default async function RootLayout({
	params,
	children,
}: Readonly<{
	children: React.ReactNode
	params: Promise<{ locale: string }>
}>) {
	const { locale } = await params
	const data = await getLayoutContent(locale)
	return (
		<>
			<NavDesktop data={data} />
			{children}
			<Footer data={data} />
		</>
	)
}
