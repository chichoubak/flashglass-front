'use client'
import { fetchRegister } from '@/api/bo/auth'
import { GoogleIcon } from '@/assets/icons/google'
import { buttonVariants } from '@/components/ui/button'
import DatePicker from '@/components/ui/date-picker'
import { Form } from '@/components/ui/form'
import { FormButton } from '@/components/ui/form-button'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/hooks/use-toast'
import { Link, useRouter } from '@/i18n/routing'
import { setClientCookie } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { useTransition } from 'react'
import { FieldValues } from 'react-hook-form'
import * as z from 'zod'

const registerFormSchema = (errors: Record<string, string>) =>
	z
		.object({
			email: z
				.string({
					message: errors.email,
				})
				.email(errors.emailInvalid),
			firstName: z.string({ message: errors.firstName }).min(2, errors.firstName),
			lastName: z.string({ message: errors.lastName }).min(2, errors.lastName),
			birthDate: z.date({ message: errors.birthDate }),
			password: z.string({ message: errors.password }).min(8, errors.passwordLength),
		})
		.refine(
			(data) => {
				const date = new Date(data.birthDate)
				const now = new Date()
				const diff = now.getFullYear() - date.getFullYear()
				return diff >= 18
			},
			{
				message: errors.birthDateAge,
				path: ['birthDate'],
			}
		)

export function RegisterForm() {
	const [isPending, startTransition] = useTransition()
	const router = useRouter()

	const translate = useTranslations('auth.register')
	const errors = {
		email: translate('form.errors.email'),
		emailInvalid: translate('form.errors.emailInvalid'),
		firstName: translate('form.errors.firstName'),
		lastName: translate('form.errors.lastName'),
		birthDate: translate('form.errors.birthDate'),
		password: translate('form.errors.password'),
		passwordLength: translate('form.errors.passwordLength'),
		birthDateAge: translate('form.errors.birthDateAge'),
	}

	const handleSubmit = (fields: FieldValues) => {
		startTransition(async () => {
			const response = await fetchRegister(fetch, {
				email: fields.email,
				first_name: fields.firstName,
				last_name: fields.lastName,
				birth_date: fields.birthDate,
				password: fields.password,
			})
			if (response?.data?.success) {
				setClientCookie('email', fields.email)
				router.push('/auth/otp')
			} else {
				toast({
					title: translate('form.errors.title'),
					description: response?.data?.message ?? translate('form.errors.generic'),
					variant: 'destructive',
				})
			}
		})
	}

	return (
		<Form schema={registerFormSchema(errors)} className='flex flex-col gap-6' onSubmit={handleSubmit}>
			<div className='flex flex-col items-center gap-2 text-center'>
				<h1 className='text-2xl font-bold'>{translate('title')}</h1>
				<p className='text-balance text-sm text-muted-foreground'>{translate('description')}</p>
			</div>
			<div className='grid gap-6'>
				<div className='grid grid-cols-2 gap-2'>
					<FormField htmlFor='firstName' name='firstName' placeholder='John' label={translate('form.fisrtName')} render={Input} />
					<FormField htmlFor='lastName' name='lastName' placeholder='Joe' label={translate('form.lastName')} render={Input} />
				</div>

				<div className='grid gap-2'>
					<Label htmlFor='birthDate'>{translate('form.birthDate')}</Label>
					<FormField
						id='birthDate'
						name='birthDate'
						render={({ error, onChange, onBlur }) => (
							<DatePicker
								placeholder={translate('form.birthDatePlaceholder')}
								error={error}
								onSelect={onChange as unknown as (val: Date) => void}
								onBlur={onBlur as VoidFunction}
							/>
						)}
					/>
				</div>
				<FormField htmlFor='email' name='email' type='email' placeholder='m@example.com' label={translate('form.email')} render={Input} />
				<FormField htmlFor='password' name='password' type='password' placeholder='*********' label={translate('form.password')} render={Input} />

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
				{translate('form.alreadyAccount')}{' '}
				<Link href='/auth/login' className='underline underline-offset-4'>
					{translate('form.login')}
				</Link>
			</div>
		</Form>
	)
}
