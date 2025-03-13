'use client'

import { ReactNode } from 'react'
import { FieldValues, FormProvider, useForm, UseFormProps, UseFormReturn } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { ZodSchema } from 'zod'

export interface FormProps extends UseFormProps {
	children: ReactNode | ReactNode[]
	schema?: ZodSchema
	onSubmit?: (data: FieldValues, context?: UseFormReturn<FieldValues>) => Promise<void> | void
	className?: string
}

export function Form(props: FormProps) {
	const { children, onSubmit, schema, ...formProps } = props

	const methods = useForm({
		resolver: schema ? zodResolver(schema) : undefined,
		mode: 'onBlur',
		reValidateMode: 'onChange',
		...formProps,
	})

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit((data: FieldValues) => onSubmit && onSubmit(data, methods))} className={props.className}>
				{children}
			</form>
		</FormProvider>
	)
}
