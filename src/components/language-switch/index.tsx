'use client'
import { FrFlagIcon } from '@/assets/icons/fr-flag'
import { UsFlagIcon } from '@/assets/icons/us-flag'
import { useIsMobile } from '@/hooks/use-is-mobile'
import { usePathname, useRouter } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { useLocale } from 'next-intl'
import { useTransition } from 'react'
import { Button } from '../ui/button'

interface LanguageSwitchProps {
	isShort?: boolean
}

export function LanguageSwitch(props: LanguageSwitchProps) {
	const { isShort } = props
	const isMobile = useIsMobile()

	const locale = useLocale()

	const pathname = usePathname()
	const router = useRouter()

	const isSelectedLanguage = (lang: string) => locale === lang

	const handleLanguageChange = (lang: string) => {
		startTransition(() => router.push(pathname, { locale: lang }))
	}

	const [isPending, startTransition] = useTransition()
	return (
		<div className='flex flex-nowrap items-center bg-[#E6E7E8] rounded-full shadow h-fit'>
			<Button
				loading={isPending}
				variant='ghost'
				onClick={() => handleLanguageChange('en')}
				className={cn(
					'text-xs hover:text-[#2988E0] hover:bg-transparent text-[#7F7F83] h-fit py-2',
					isSelectedLanguage('en') && 'text-[#2988E0] bg-white dark:bg-foreground hover:bg-white hover:dark:bg-foreground rounded-full'
				)}
			>
				<UsFlagIcon /> {!isShort && !isMobile ? 'English' : ''}
			</Button>

			<Button
				loading={isPending}
				variant='ghost'
				onClick={() => handleLanguageChange('fr')}
				className={cn(
					'text-xs hover:text-[#2988E0] hover:bg-transparent text-[#7F7F83] h-fit py-2',
					isSelectedLanguage('fr') && 'text-[#2988E0] bg-white dark:bg-foreground hover:bg-white hover:dark:bg-foreground rounded-full'
				)}
			>
				<FrFlagIcon /> {!isShort && !isMobile ? 'Français' : ''}
			</Button>
		</div>
	)
}
