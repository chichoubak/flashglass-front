import { Separator } from '@/components/ui/separator'
import { Link } from '@/i18n/routing'
import { CategoryType } from '@/types/collection'
import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from 'lucide-react'
import Image from 'next/image'

const footerSections = (categories: CategoryType[]) => [
	{
		title: 'Product',
		links: categories.map((category) => ({
			title: category.title,
			href: `/category/${category.id}`,
		})),
	},
	{
		title: 'About Us',
		links: [
			{
				title: 'title 1',
				href: '#',
			},
			{
				title: 'title 2',
				href: '#',
			},
			{
				title: 'title 3',
				href: '#',
			},
		],
	},
]

export function Footer({ data }: { data: CategoryType[] }) {
	return (
		<footer className='border-t'>
			<div className='max-w-screen-xl mx-auto'>
				<div className='py-12 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-x-8 gap-y-10 px-6 xl:px-0 place-items-center lg:place-items-start'>
					<div className='col-span-full xl:col-span-2'>
						{/* Logo */}
						<Link href='/'>
							<Image src='/logoFlashglass.jpeg' alt='logo' width={100} height={40} />
						</Link>
					</div>

					{footerSections(data).map(({ title, links }) => (
						<div key={title}>
							<h6 className='font-semibold'>{title}</h6>
							<ul className='mt-6 space-y-4'>
								{links.map(({ title, href }) => (
									<li key={title}>
										<Link href={href} className='text-muted-foreground hover:text-foreground'>
											{title}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}

					{/* Subscribe Newsletter */}
					<div className='flex flex-col items-center lg:items-start col-span-2 lg:col-span-1'>
						<h6 className='font-semibold'>Social Media</h6>
						<div className='flex lg:flex-col gap-5 text-muted-foreground mt-6'>
							<Link className='flex flex-nowrap items-center gap-2' href='#' target='_blank'>
								<FacebookIcon className='size-5' /> <span className='hidden lg:block'>Facebook</span>
							</Link>
							<Link className='flex flex-nowrap items-center gap-2' href='#' target='_blank'>
								<InstagramIcon className='size-5' /> <span className='hidden lg:block'>Instagram</span>
							</Link>
							{/* <Link className='flex flex-nowrap items-center gap-2' href='#' target='_blank'>
								<TwitterIcon className='size-5' /> <span className='hidden lg:block'>Twitter</span>
							</Link> */}
							<Link className='flex flex-nowrap items-center gap-2' href='#' target='_blank'>
								<LinkedinIcon className='size-5' /> <span className='hidden lg:block'>Linkedin</span>
							</Link>
							{/* <Link className='flex flex-nowrap items-center gap-2' href='#' target='_blank'>
								<YoutubeIcon className='size-5' /> <span className='hidden lg:block'>Youtube</span>
							</Link> */}
						</div>
					</div>
				</div>
				<Separator className='bg-input' />
				<div className='py-5 flex justify-center px-6'>
					{/* Copyright */}
					<span className='text-muted-foreground'>
						&copy; {new Date().getFullYear()}{' '}
						<Link href='/' target='_blank'>
							Flashglass
						</Link>
						. All rights reserved.
					</span>
				</div>
			</div>
		</footer>
	)
}
