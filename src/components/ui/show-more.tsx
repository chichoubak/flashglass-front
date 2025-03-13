'use client'

import { cn } from '@/lib/utils'
import { ChevronsDownIcon, ChevronsUpIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export function ShowMore({ className, children }: { className?: string; children: React.ReactNode }) {
	const [showAll, setShowAll] = useState(false)
	const translate = useTranslations('UI.showMore')
	return (
		<>
			<div className={cn('overflow-hidden max-h-[10.5rem] transition-all duration-500', className, showAll && '!max-h-none')}>{children}</div>
			<button className='text-primary w-fit flex flex-nowrap items-center mx-auto' onClick={() => setShowAll((state) => !state)}>
				{!showAll ? <ChevronsDownIcon size={15} /> : <ChevronsUpIcon size={15} />} {translate(!showAll ? 'more' : 'less')}{' '}
				{!showAll ? <ChevronsDownIcon size={15} /> : <ChevronsUpIcon size={15} />}
			</button>
		</>
	)
}
