'use client'
import { useScrollPosition } from '@/hooks/use-scroll-position'
import { NavigationMenuLink } from '@/components/ui/navigation-menu'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'

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

export const ListItem = ({ list }: { list: { title: string; link: string }[] }) => {
	return (
		<div className='flex flex-col gap-1'>
			<ul className='flex flex-col gap-2'>
				{list?.length > 0 &&
					list.map((child, index) => (
						<li key={index}>
							<NavigationMenuLink asChild>
								<Link
									href={child.link}
									className='font-medium text-gray-700 hover:text-primary leading-5'
								>
									{child.title}
								</Link>
							</NavigationMenuLink>
						</li>
					))}
			</ul>
		</div>
	)
}

ListItem.displayName = 'ListItem'
