import { getTranslations } from 'next-intl/server'

const highlightKeys = ['expertise', 'innovation', 'support', 'value'] as const

export async function AboutUsSection() {
	const translate = await getTranslations('homepage.aboutUs')

	return (
		<section className='w-full mx-auto bg-gradient-to-br from-slate-50 via-white to-slate-100 rounded-3xl px-6 py-10 lg:px-14 lg:py-16 border shadow-sm'>
			<div className='grid gap-6 lg:gap-12 lg:grid-cols-2'>
				<header className='flex flex-col gap-4 lg:col-span-2'>
					<h2 className='text-4xl md:text-5xl font-black tracking-tight text-primary'>
						{translate('title')}
					</h2>
					<p className='text-base md:text-lg text-muted-foreground leading-relaxed'>
						{translate('description')}
					</p>
				</header>
				{highlightKeys.map((key) => (
					<article
						key={key}
						className='flex flex-col gap-2 rounded-2xl border bg-white/70 backdrop-blur-sm px-5 py-4 shadow-sm'
					>
						<h3 className='text-lg font-semibold text-[#02267E]'>
							{translate(`highlights.${key}.title`)}
						</h3>
						<p className='text-sm md:text-base text-muted-foreground leading-relaxed'>
							{translate(`highlights.${key}.description`)}
						</p>
					</article>
				))}
			</div>
		</section>
	)
}

