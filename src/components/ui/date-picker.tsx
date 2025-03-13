'use client'

import { format } from 'date-fns'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { enUS, fr } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { DayEventHandler } from 'react-day-picker'

interface DatePickerProps {
	defaultDate?: Date
	placeholder?: string
	format?: string
	error?: string
	onSelect?: (date: Date) => void
	onBlur?: VoidFunction
}

export default function DatePicker(props: DatePickerProps) {
	const { defaultDate, placeholder, format: dateFormat, error, onSelect, onBlur } = props

	const [date, setDate] = React.useState<Date | undefined>(defaultDate)

	const locale = useLocale()
	const translate = useTranslations('UI.datePicker')

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant={'outline'} className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground', error && 'border-destructive')}>
					<CalendarIcon className='mr-2 h-4 w-4' />
					{date ? format(date, dateFormat ?? 'yyyy/MM/dd') : <span>{placeholder ?? translate('label')}</span>}
				</Button>
			</PopoverTrigger>
			{error && <p className='text-destructive text-xs'>{error}</p>}
			<PopoverContent className='w-full p-0' align='start'>
				<Calendar
					mode='single'
					selected={date}
					onSelect={(_date) => {
						setDate(_date!)
						if (onSelect) onSelect(_date!)
					}}
					locale={
						{
							en: enUS,
							fr,
						}[locale]
					}
					onDayBlur={onBlur as DayEventHandler<React.FocusEvent>}
					autoFocus
				/>
			</PopoverContent>
		</Popover>
	)
}
