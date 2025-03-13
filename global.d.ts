import fr from './src/messages/fr.json'

type Messages = typeof fr

declare global {
	// Use type safe message keys with `next-intl`
	type IntlMessages = Messages
	// Extend the NodeJS namespace with your custom properties
	namespace NodeJS {
		interface ProcessEnv {
			NEXT_PUBLIC_BO_BASEURL: string
		}
	}
}
