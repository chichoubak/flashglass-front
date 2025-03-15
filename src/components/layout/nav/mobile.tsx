'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CustomImage } from '@/components/ui/image'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Link } from '@/i18n/routing'
import { CategoryType } from '@/types/collection'
import { MenuIcon } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export const NavMobile = ({ data }: { data: CategoryType[] }) => {
	const [open, setOpen] = useState(false)
	return (
		<div className='flex lg:hidden items-center gap-2'>

			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger asChild>
					<Button variant='outline' size='icon'>
						<MenuIcon />
					</Button>
				</SheetTrigger>
				<SheetContent className='p-4 overflow-auto'>
					{/* <button onClick={() => setOpen(false)} className='absolute top-2 right-2'>
					<XIcon />
				</button> */}

					<Accordion type='single' collapsible className='mt-8'>
						{data?.map((category: CategoryType) => (
							<AccordionItem key={category.id} value={category.id.toString()}>
								<AccordionTrigger>{category.title}</AccordionTrigger>
								<AccordionContent>
									<div className='relative flex flex-nowrap gap-1 items-end h-20 pb-2'>
										<CustomImage src={category?.avatar} alt={category?.title} className='object-cover rounded-md' fill />
									</div>
									<ul className='flex flex-col gap-4  w-full  pt-3'>
										{category.types.map((type) => (
											<li key={type.id}>
												<Link
													href={`/products/${type.id}`}
													onClick={() => setOpen(false)} // Ferme le Sheet après le clic
													className='font-medium text-gray-700 hover:text-primary leading-5'
												>
													{type.name}
												</Link>
											</li>
										))}
									</ul>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</SheetContent>
			</Sheet>
		</div>
	)
}
