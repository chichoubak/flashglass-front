import { cn } from '@/lib/utils'
import { FaqType } from '@/types/collection'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { PlusIcon } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem } from '../ui/accordion'
import { ParseHtml } from '../ui/parse-html'

interface FaqProps {
	data: FaqType[]
	title?: string
	description?: string
}
export function Faq(props: FaqProps) {
	const { data, title, description } = props
	return (
		<div className='w-full flex items-center justify-center pt-5 pb-10'>
			<div className='w-full lg:max-w-screen-md'>
				{title && <h2 className='text-[#7d7e82] text-3xl md:text-5xl !leading-[1.15] font-black tracking-tighter'>{title}</h2>}
				{description && <p className='mt-1.5 text-lg text-muted-foreground'>{description}</p>}
				{data?.length > 0 && (
					<Accordion type='single' collapsible className='mt-8 space-y-4' defaultValue='question-0'>
						{data.map((faq) => (
							<AccordionItem key={faq.id} value={faq?.id?.toString()} className='bg-accent py-1 px-4 rounded-xl border-none'>
								<AccordionPrimitive.Header className='flex'>
									<AccordionPrimitive.Trigger
										className={cn(
											'w-full max-w-full flex flex-1 items-center justify-between py-4 font-semibold tracking-tight transition-all hover:underline [&[data-state=open]>svg]:rotate-45',
											'text-start text-lg'
										)}
									>
										{faq?.title} <PlusIcon className='h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200' />
									</AccordionPrimitive.Trigger>
								</AccordionPrimitive.Header>
								<AccordionContent>
									<ParseHtml html={faq?.description} />
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				)}
			</div>
		</div>
	)
}
