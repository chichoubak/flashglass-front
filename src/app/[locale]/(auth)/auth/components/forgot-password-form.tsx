'use client'
import { fetchForgetPassword } from '@/api/bo/auth'
import { buttonVariants } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { FormButton } from '@/components/ui/form-button'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import { Link } from '@/i18n/routing'
import { ArrowLeftIcon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useTransition } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'
import * as z from 'zod'

const forgotPasswordFormSchema = (errors: Record<string, string>) =>
	z.object({
		email: z.string({ message: errors.email }).email(errors.emailInvalid),
	})

export function ForgotPasswordForm() {
	const [isPending, startTransition] = useTransition()

	const locale = useLocale()
	const translate = useTranslations('auth.forgotPassword')

	const errors = {
		email: translate('form.errors.email'),
		emailInvalid: translate('form.errors.emailInvalid'),
	}

	const handleSubmit = (fields: FieldValues, context?: UseFormReturn<FieldValues>) => {
		startTransition(async () => {
			const response = await fetchForgetPassword(fetch, {
				email: fields.email,
				lang: locale,
			})
			if (response?.data?.success) {
				toast({
					title: translate('success.title'),
					description: translate('success.description'),
					variant: 'success',
				})
				context?.reset()
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
		<Form schema={forgotPasswordFormSchema(errors)} className='flex flex-col gap-6' onSubmit={handleSubmit}>
			<div className='flex flex-col items-center gap-2 text-center'>
				<h1 className='text-2xl font-bold'>{translate('title')}</h1>
				<p className='text-balance text-sm text-muted-foreground'>{translate('description')}</p>
			</div>
			<div className='grid gap-4'>
				<FormField htmlFor='email' type='email' name='email' placeholder='m@example.com' label={translate('form.email')} render={Input} />
				<FormButton loading={isPending} className='w-full mt-2'>
					{translate('form.submit')}
				</FormButton>
				<Link href='/auth/login' className={buttonVariants({ class: 'w-full', variant: 'outline' })}>
					<ArrowLeftIcon strokeWidth={2} /> {translate('form.login')}
				</Link>
			</div>
		</Form>
	)
}
