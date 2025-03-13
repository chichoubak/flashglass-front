import { SubProductType } from '@/types/collection'
import { Fragment } from 'react'

export function ProductPriceTab({ subProducts }: { subProducts: SubProductType[] }) {
	return (
		<div className='grid grid-cols-[1.5fr_.5fr] bg-[#E6E8F5] rounded-md items-stretch'>
			{subProducts.map((subProduct) => (
				<Fragment key={subProduct.id}>
					<p className='border-e border-b border-[white] p-3 ps-4'>{subProduct?.title}</p>
					<p className='border-b text-primary font-semibold py-2 px-4 border-[white]'>{subProduct?.price}DH</p>
				</Fragment>
			))}
		</div>
	)
}
