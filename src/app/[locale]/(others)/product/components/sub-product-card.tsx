import { CustomImage } from '@/components/ui/image'
import { SubProductType } from '@/types/collection'

export function SubProductCard({ subProduct }: { subProduct?: SubProductType }) {
	if (!subProduct) return null
	return (
		<div className='w-80 rounded-xl border overflow-hidden'>
			<CustomImage src={subProduct?.avatar} height={290} width={320} className='h-[290px] object-cover' alt={subProduct?.title} />
			<div className='flex flex-nowrap items-center justify-between gap-4 p-4'>
				<header className='flex flex-col gap-1'>
					<h2 className='text-sm text-[#02267E] font-semibold'>{subProduct.title}</h2>
					<p className='text-gray-400 text-sm'>
						{subProduct.width} x {subProduct?.height}
					</p>
				</header>
				<p className='text-primary text-lg font-semibold min-w-max'>{subProduct?.price} DH</p>
			</div>
		</div>
	)
}
