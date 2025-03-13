'use client'
import { useScrollPosition } from '@/hooks/use-scroll-position'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

export function NavCollapse({ className, children, position }: { className?: string; children: React.ReactNode; position: 'up' | 'down' }) {
	const currentPosition = useScrollPosition()
	return (
		<nav
			className={cn('transition-transform duration-500', className)}
			style={{
				transform: currentPosition !== position ? 'translateY(0)' : 'translateY(-200%)',
			}}
		>
			{children}
		</nav>
	)
}

export const ListItem = ({ category, list }: { category: number; list: { title: string; link: string }[] }) => {
	const translate = useTranslations('layout.nav')
	return (
		<div className='flex flex-col gap-1'>
			<ul className='flex flex-col gap-2'>
				{list?.length > 0 &&
					list.map((child, index) => (
						<li key={index} className='font-medium text-gray-700 hover:text-primary leading-5'>
							<Link href={child.link}>{child.title}</Link>
						</li>
					))}
			</ul>
			<Link href={`/category/${category}`} className='text-primary hover:text-primary'>
				{translate('seeAll')}
			</Link>
		</div>
	)
}
ListItem.displayName = 'ListItem'
