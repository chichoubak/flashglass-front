import { Faq } from '@/components/faq'
import { FaqType } from '@/types/collection'
import { getTranslations } from 'next-intl/server'

export async function FaqHomepage({ data }: { data: FaqType[] }) {
	const translate = await getTranslations('homepage.faq')
	return <Faq title={translate('title')} description={translate('description')} data={data} />
}
