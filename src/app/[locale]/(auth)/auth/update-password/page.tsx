import { redirect } from '@/i18n/routing'
import { AuthPlaceholder } from '../components/page-placeholder'
import { UpdatePasswordForm } from '../components/update-password-form'

export default async function ForgotPasswordPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ token: string }> }) {
	const token = (await searchParams)?.token
	const locale = (await params)?.locale

	if (!token)
		redirect({
			href: '/auth/login',
			locale,
		})

	return (
		<AuthPlaceholder>
			<UpdatePasswordForm token={token} />
		</AuthPlaceholder>
	)
}
