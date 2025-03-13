import { LanguageSwitch } from '@/components/language-switch'
import { Button, buttonVariants } from '@/components/ui/button'
import { CustomImage } from '@/components/ui/image'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu'
import { Separator } from '@/components/ui/separator'
import { Link } from '@/i18n/routing'
import { checkAuthAction, logoutAction } from '@/lib/sessions'
import { cn } from '@/lib/utils'
import { CategoryType } from '@/types/collection'
import { ContactIcon, LogOutIcon, Settings2Icon, ShoppingBagIcon, ShoppingBasketIcon, SquarePenIcon, UserIcon, UserPenIcon } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { ListItem, NavCollapse } from './collapse'
import { NavMobile } from './mobile'

export async function NavDesktop({ data }: { data: CategoryType[] }) {
	const translate = await getTranslations('layout.nav')
	const isConnected = await checkAuthAction()
	return (
		<NavCollapse className='w-full sticky top-0 left-0 py-4 border-b border-gray-200 bg-white z-40' position='down'>
			<div className='w-[90%] max-w-screen-xl mx-auto grid grid-cols-[auto_auto] lg:grid-cols-[auto_1fr_auto] justify-between gap-4 items-center'>
				<Link href='/'>
					<Image src='/logoFlashglass.jpeg' alt='logo' width={100} height={40} />
				</Link>
				<NavigationMenu className='hidden lg:block mx-auto'>
					<NavigationMenuList>
						{data?.length > 0 &&
							data.map((category) => (
								<NavigationMenuItem key={category?.id}>
									<NavigationMenuTrigger>{category?.title}</NavigationMenuTrigger>
									{category?.products?.length > 0 && (
										<NavigationMenuContent>
											<ul className='grid gap-5 p-6 md:w-[450px] lg:grid-cols-2 justify-center'>
												<li className='relative rounded-md overflow-hidden'>
													<CustomImage src={category.avatar} alt={category.title} className='object-cover' fill />
												</li>
												<ListItem category={category.id} list={category.products.map((product) => ({ title: product?.title, link: `/product/${product.id}` }))} />
											</ul>
										</NavigationMenuContent>
									)}
								</NavigationMenuItem>
							))}
					</NavigationMenuList>
				</NavigationMenu>
				{/* <Button
					asChild
					variant="outline"
					className="hidden lg:inline-flex items-center gap-2 text-primary hover:text-primary h-auto"
				>
					<Link href="/contact">
						<span className="flex items-center gap-2">
							<ContactIcon className="stroke-primary" />
							Contactez-nous
						</span>
					</Link>
				</Button> */}

<Link href="/contact" className="hidden lg:inline-flex items-center gap-2 text-primary hover:text-primary h-auto border border-primary px-4 py-2 rounded-md">
    <ContactIcon className="stroke-primary" />
    Contactez-nous
</Link>



				{/* <NavigationMenu className='hidden lg:block mx-auto [&>div:last-child]:-translate-x-[90px]'>
					<NavigationMenuList className=''>
						<div className='flex flex-nowrap gap-3 items-center'>
							<NavigationMenuItem>
								<NavigationMenuTrigger
									className={cn(
										buttonVariants({ variant: 'outline' }),
										'text-primary hover:text-primary h-auto  focus:bg-accent focus:text-primary data-[state=open]:bg-accent data-[state=open]:text-primary'
									)}
								>
									<UserIcon className='stroke-primary' /> {translate('account')}
								</NavigationMenuTrigger>
								<NavigationMenuContent>
									<div className='flex flex-col items-center gap-3 p-4 md:w-[300px]'>
										<ul className='flex flex-col self-start gap-4 p-2'>
											<li className='font-normal text-gray-700 hover:text-primary leading-5'>
												<Link href='#' className='flex flex-nowrap gap-2 items-center'>
													<ShoppingBagIcon size={20} /> {translate('myOrders')}
												</Link>
											</li>
											<li className='font-normal text-gray-700 hover:text-primary leading-5'>
												<Link href='#' className='flex flex-nowrap gap-2 items-center'>
													<Settings2Icon size={20} /> {translate('mySettings')}
												</Link>
											</li>
											<li className='font-normal text-gray-700 hover:text-primary leading-5'>
												<Link href='#' className='flex flex-nowrap gap-2 items-center'>
													<UserPenIcon size={20} /> {translate('personalDetails')}
												</Link>
											</li>
										</ul>
										<Separator />
										{!isConnected && (
											<Link href='/auth/login' className={buttonVariants({ class: 'w-full' })}>
												{translate('login')}
											</Link>
										)}
										{isConnected && (
											<Button variant='destructive' className='flex w-full items-center' onClick={logoutAction}>
												{translate('logout')} <LogOutIcon />
											</Button>
										)}
										<div className='w-fit'>
											<LanguageSwitch />
										</div>
									</div>
								</NavigationMenuContent>
							</NavigationMenuItem>

							<Button variant='outline' className='text-primary hover:text-primary h-auto'>
								<SquarePenIcon className='stroke-primary' /> {translate('draft')}
							</Button>
							<Button variant='outline' className='text-primary hover:text-primary h-auto'>
								<ShoppingBasketIcon className='stroke-primary' /> {translate('cart')}
							</Button>
						</div>
					</NavigationMenuList>
				</NavigationMenu> */}
				<NavMobile data={data} isConnected={isConnected} />
			</div>
		</NavCollapse>
	)
}
