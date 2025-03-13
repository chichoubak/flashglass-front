import { generateImagePath } from '@/lib/utils'
import Image, { ImageProps } from 'next/image'

export function CustomImage(props: ImageProps) {
	let { src } = props
	if (typeof src === 'string') {
		src = generateImagePath({ src })
	}
	return <Image {...props} src={src} alt={props.alt || ''} />
}
