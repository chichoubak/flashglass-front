'use client'
import { fetchUpdatePassword } from '@/api/bo/auth'
import { Form } from '@/components/ui/form'
import { FormButton } from '@/components/ui/form-button'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import { useRouter } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { useTransition } from 'react'
import { FieldValues } from 'react-hook-form'
import * as z from 'zod'

const updatePasswordFormSchema = (errors: Record<string, string>) =>
	z
		.object({
			password: z.string({ message: errors.password }).min(8, errors.passwordInvalid),
			confirmPassword: z.string({ message: errors.confirmPassword }).min(8, errors.passwordInvalid),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: errors.confirmPasswordMatch,
			path: ['confirmPassword'],
		})

export function UpdatePasswordForm({ token }: { token: string }) {
	const [isPending, startTransition] = useTransition()

	const router = useRouter()
	const translate = useTranslations('auth.updatePassword')

	const errors = {
		password: translate('form.errors.password'),
		passwordInvalid: translate('form.errors.passwordLength'),
		confirmPassword: translate('form.errors.confirmPassword'),
		confirmPasswordMatch: translate('form.errors.confirmPasswordMatch'),
	}

	const handleSubmit = (fields: FieldValues) => {
		startTransition(async () => {
			const response = await fetchUpdatePassword(fetch, {
				token,
				password: fields.password,
			})
			if (response?.data?.success) {
				toast({
					title: translate('success.title'),
					description: translate('success.description'),
					variant: 'success',
				})
				router.push('/auth/login')
			} else {
				toast({
					title: translate('failed.title'),
					description: translate('failed.description'),
					variant: 'destructive',
				})
			}
		})
	}

	return (
		<Form schema={updatePasswordFormSchema(errors)} className='flex flex-col gap-6' onSubmit={handleSubmit}>
			<div className='flex flex-col items-center gap-2 text-center'>
				<h1 className='text-2xl font-bold'>{translate('title')}</h1>
				<p className='text-balance text-sm text-muted-foreground'>{translate('description')}</p>
			</div>
			<div className='grid gap-4'>
				<FormField htmlFor='password' type='password' name='password' placeholder='**********' label={translate('form.password')} render={Input} />
				<FormField htmlFor='confirmPassword' type='password' name='confirmPassword' placeholder='**********' label={translate('form.confirmPassword')} render={Input} />
				<FormButton loading={isPending} className='w-full mt-2'>
					{translate('form.submit')}
				</FormButton>
			</div>
		</Form>
	)
}
