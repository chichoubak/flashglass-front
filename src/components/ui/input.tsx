import * as React from 'react'

import { cn } from '@/lib/utils'
import { Label } from './label'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
	error?: string
	htmlFor?: string
}
const Input = ({ label, error, htmlFor, className, type, ...props }: InputProps) => {
	return (
		<div className='flex flex-col gap-1'>
			{label && <Label htmlFor={htmlFor}>{label}</Label>}
			<input
				type={type}
				className={cn(
					'flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
					label && 'mt-1',
					error && 'border-destructive',
					className
				)}
				id={htmlFor}
				{...props}
			/>
			{error && <p className='text-destructive text-xs'>{error}</p>}
		</div>
	)
}

export { Input }
