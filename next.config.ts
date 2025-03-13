import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()
const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'bo.flashglass.ma',
				port: '',
			},
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '8055',
			},
		],
	},
}

export default withNextIntl(nextConfig)
