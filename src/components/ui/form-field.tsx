'use client'

import { ReactElement } from 'react'
import { Controller, FieldValues, useFormContext, UseFormReturn } from 'react-hook-form'
import { InputProps } from './input'

export interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	context?: UseFormReturn<FieldValues>
	error?: string
}
interface FormFieldBaseProps {
	name: string
	render: (props: CustomInputProps) => ReactElement
	rest: React.InputHTMLAttributes<HTMLInputElement>
	defaultValue?: string | number | readonly string[]
}

// Generalized form field rendering logic
function FormFieldBase({ name, defaultValue, render, rest }: FormFieldBaseProps) {
	const context = useFormContext()

	return (
		<Controller
			control={context.control}
			name={name}
			defaultValue={defaultValue || ''}
			render={({ field, formState }) =>
				render({
					error: formState?.errors?.[name]?.message as string,
					...rest,
					onBlur: field.onBlur,
					onChange: field.onChange,
					value: field.value,
					name: field.name,
					context,
				})
			}
		/>
	)
}

export interface FormFieldInputProps extends InputProps {
	render: (props: CustomInputProps) => ReactElement
}

export function FormField(props: FormFieldInputProps) {
	const { render, name, defaultValue, ...rest } = props
	return <FormFieldBase name={name!} defaultValue={defaultValue} render={render} rest={rest} />
}
