'use client'

import { useFormContext } from 'react-hook-form'
import { Button, ButtonProps } from './button'

export function FormButton(props: ButtonProps) {
	const { children, ...rest } = props
	const { formState } = useFormContext()

	return (
		<Button {...rest} type='submit' disabled={props.disabled || !formState.isValid} loading={props.loading || formState.isLoading}>
			{children}
		</Button>
	)
}
