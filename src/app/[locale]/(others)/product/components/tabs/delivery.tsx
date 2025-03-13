import { ProductType } from '@/types/collection'
import { CircleGaugeIcon, RocketIcon } from 'lucide-react'

export function ProductDeliveryTab({}: { product: ProductType }) {
	return (
		<div className='flex flex-col gap-3'>
			<div className='flex flex-nowrap items-center gap-3'>
				<CircleGaugeIcon className='stroke-primary size-6 min-w-6' />
				<p>
					<span className='font-medium text-primary'>Standard:</span> Thu, 2/13 - Fri, 2/14
				</p>
			</div>
			<div className='flex flex-nowrap items-center gap-3'>
				<RocketIcon className='stroke-primary size-6 min-w-6' />
				<p>
					<span className='font-medium text-primary'>Express:</span> Thu, 2/13 - Fri, 2/14 {`(subject to country's eligibility)`}
				</p>
			</div>
		</div>
	)
}
