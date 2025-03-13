import { LanguageSwitch } from '@/components/language-switch'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button, buttonVariants } from '@/components/ui/button'
import { CustomImage } from '@/components/ui/image'
import { Sheet, SheetContent, SheetFooter, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Link } from '@/i18n/routing'
import { logoutAction } from '@/lib/sessions'
import { CategoryType } from '@/types/collection'
import { ContactIcon, LogOutIcon, MenuIcon, ShoppingBasketIcon, SquarePenIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { ListItem } from './collapse'

export function NavMobile({ data, isConnected }: { data: CategoryType[]; isConnected: boolean }) {
	const translate = useTranslations('layout.nav')
	return (
		<div className='flex lg:hidden items-center gap-2'>
			<Accordion className='flex flex-nowrap gap-3' type='single' collapsible>
				<Sheet>
					{/* <Button variant='outline' className='text-primary hover:text-primary h-auto inline-flex lg:hidden'>
						<ShoppingBasketIcon className='stroke-primary' /> {translate('cart')}
					</Button> */}
					<SheetTrigger asChild>
						<Button variant='outline' size='icon'>
							<MenuIcon />
						</Button>
					</SheetTrigger>
					<SheetContent className='grid grid-rows-[auto_1fr_auto] gap-4 p-4'>
						{/* <SheetTitle className='flex -mt-2'>
							<LanguageSwitch />
						</SheetTitle> */}
						<div className='flex flex-col mt-8 overflow-y-auto [&>div:last-child]:border-none'>
							{data?.length > 0 &&
								data.map((category) => (
									<AccordionItem value={category?.id?.toString()} key={category?.id}>
										<AccordionTrigger>{category?.title}</AccordionTrigger>
										<AccordionContent className='flex flex-col gap-4'>
											<div className='relative flex flex-nowrap gap-1 items-end h-20'>
												<CustomImage src={category?.avatar} alt={category?.title} className='object-cover rounded-md' fill />
											</div>
											<ul className='flex flex-col gap-4 w-full'>
												<ListItem category={category.id} list={category?.products?.map((product) => ({ title: product?.title, link: `/product/${product.id}` }))} />
											</ul>
										</AccordionContent>
									</AccordionItem>
								))}
						</div>
						<SheetFooter className='mt-auto grid grid-cols-2 items-center gap-2'>
							{/* <Button variant='outline' className='text-primary hover:text-primary h-auto'>
								<SquarePenIcon className='stroke-primary' /> {translate('draft')}
							</Button>
							<Button variant='outline' className='text-primary hover:text-primary h-auto'>
								<ShoppingBasketIcon className='stroke-primary' /> {translate('cart')}
							</Button> */}
							<Link href='/contact' className={buttonVariants({ class: 'w-full col-span-full' })}>
									{'Contactez-nous'}
								</Link>
							{/* {!isConnected && (
								<Link href='/auth/login' className={buttonVariants({ class: 'w-full col-span-full' })}>
									{translate('login')}
								</Link>
							)}
							{isConnected && (
								<Button variant='destructive' className='flex w-full items-center col-span-full' onClick={logoutAction}>
									{translate('logout')} <LogOutIcon />
								</Button>
							)} */}
						</SheetFooter>
					</SheetContent>
				</Sheet>
			</Accordion>
		</div>
	)
}
