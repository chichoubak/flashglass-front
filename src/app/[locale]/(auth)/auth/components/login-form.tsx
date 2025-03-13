'use client'
import { GoogleIcon } from '@/assets/icons/google'
import { buttonVariants } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { FormButton } from '@/components/ui/form-button'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { useTransition } from 'react'
import { FieldValues } from 'react-hook-form'
import * as z from 'zod'
import { loginAction } from './actions'

const loginSchema = (errors: Record<string, string>) =>
	z.object({
		email: z.string({ message: errors.email }).email(errors.email),
		password: z.string({ message: errors.password }),
	})

export function LoginForm() {
	const [isPending, startTransition] = useTransition()
	const translate = useTranslations('auth.login')

	const errors = {
		email: translate('form.errors.email'),
		password: translate('form.errors.password'),
	}

	const hamdleSubmit = (fields: FieldValues) => {
		startTransition(async () => {
			const response = await loginAction(fields.email, fields.password)
			if (response?.data?.code) {
				toast({
					title: translate('form.errors.loginFailed'),
					description: translate('form.errors.loginFailedDescription'),
					variant: 'destructive',
				})
			}
		})
	}

	return (
		<Form schema={loginSchema(errors)} className='flex flex-col gap-6' onSubmit={hamdleSubmit}>
			<div className='flex flex-col items-center gap-2 text-center'>
				<h1 className='text-2xl font-bold'>{translate('title')}</h1>
				<p className='text-balance text-sm text-muted-foreground'>{translate('description')}</p>
			</div>
			<div className='grid gap-6'>
				<FormField htmlFor='email' type='email' name='email' placeholder='m@example.com' label={translate('form.email')} render={Input} />
				<FormField htmlFor='password' type='password' name='password' placeholder='***********' label={translate('form.password')} render={Input} />
				<div className='flex items-center'>
					<Link href='/auth/forgot-password' className='ml-auto text-xs underline-offset-4 hover:underline -mt-4'>
						{translate('form.forgot')}
					</Link>
				</div>
				<FormButton loading={isPending} className='w-full'>
					{translate('form.submit')}
				</FormButton>
				<div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
					<span className='relative z-10 bg-background px-2 text-muted-foreground'>{translate('form.orContinue')}</span>
				</div>
				<Link href={process.env.NEXT_PUBLIC_MS_BASEURL + '/auth/login/google'} className={buttonVariants({ variant: 'outline', class: 'w-full' })}>
					<GoogleIcon />
					{translate('form.google')}
				</Link>
			</div>
			<div className='text-center text-sm'>
				{translate('form.noAccount')}{' '}
				<Link href='/auth/register' className='underline underline-offset-4'>
					{translate('form.register')}
				</Link>
			</div>
		</Form>
	)
}
