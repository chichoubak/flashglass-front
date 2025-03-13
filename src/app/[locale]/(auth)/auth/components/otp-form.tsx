'use client'
import { fetchCheckOTP, fetchResendOTP } from '@/api/bo/auth'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { useRouter } from '@/i18n/routing'
import { getClientCookie, removeClientCookie } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { useTransition } from 'react'
import { FieldValues } from 'react-hook-form'
import { useTimer } from 'react-timer-hook'
import * as z from 'zod'

import { Form } from '@/components/ui/form'
import { FormButton } from '@/components/ui/form-button'
import { FormField } from '@/components/ui/form-field'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'

const OTPFormSchema = z.object({
	otp: z.string().length(6),
})

export function OTPForm() {
	const router = useRouter()
	const translate = useTranslations('auth.otp')

	const [isPending, startTransition] = useTransition()
	const [isResendPending, startResendTransition] = useTransition()

	const { minutes, seconds, isRunning, restart } = useTimer({
		// 120_000 = 2 minutes
		expiryTimestamp: new Date(Date.now() + 120_000),
		autoStart: true,
	})

	const handleResetOTP = () => {
		startResendTransition(async () => {
			//handle reset otp action
			const email = getClientCookie('email') as string
			const response = await fetchResendOTP(fetch, {
				email,
			})
			if (response?.data?.success) {
				// reset the timer to 2 minutes
				restart(new Date(Date.now() + 120_000))
				toast({
					title: translate('resend.success'),
					description: translate('resend.successDescription'),
					variant: 'success',
				})
			} else {
				toast({
					title: translate('resend.error'),
					description: translate('resend.errorDescription'),
					variant: 'destructive',
				})
			}
		})
	}
	const handleSubmit = (fields: FieldValues) => {
		startTransition(async () => {
			//handle check otp action
			const email = getClientCookie('email') as string
			const response = await fetchCheckOTP(fetch, {
				email,
				otp: fields.otp,
			})
			if (response?.data?.success) {
				toast({
					title: translate('check.success'),
					description: translate('check.successDescription'),
					variant: 'success',
				})
				removeClientCookie('email')
				router.push('/auth/login')
			} else {
				toast({
					title: translate('check.error'),
					description: translate('check.errorDescription'),
					variant: 'destructive',
				})
			}
		})
	}

	return (
		<Form schema={OTPFormSchema} className='flex flex-col gap-6 w-max' onSubmit={handleSubmit}>
			<div className='flex flex-col items-center gap-2 text-center'>
				<h1 className='text-2xl font-bold'>{translate('title')}</h1>
				<p className='text-balance text-sm text-muted-foreground w-max'>{translate('description')}</p>
			</div>
			<div className='grid gap-4'>
				<FormField
					name='otp'
					render={({ onChange }) => (
						<InputOTP maxLength={6} onChange={onChange as unknown as (value: string) => void}>
							<InputOTPGroup>
								<InputOTPSlot index={0} />
								<InputOTPSlot index={1} />
								<InputOTPSlot index={2} />
								<InputOTPSlot index={3} />
								<InputOTPSlot index={4} />
								<InputOTPSlot index={5} />
							</InputOTPGroup>
						</InputOTP>
					)}
				/>
				{isRunning && (
					<p className='text-lg text-gray-500 text-center'>
						{/*fill 2 digits with 0*/}
						{minutes?.toString()?.padStart(2, '0')}:{seconds?.toString()?.padStart(2, '0')}
					</p>
				)}
				{!isRunning && (
					<Button loading={isResendPending} variant='link' onClick={handleResetOTP}>
						{translate('form.resend')}
					</Button>
				)}
				<FormButton type='submit' className='w-full' loading={isPending}>
					{translate('form.submit')}
				</FormButton>
			</div>
		</Form>
	)
}
