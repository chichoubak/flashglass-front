import { ParseHtml } from '@/components/ui/parse-html'
import { ProductType } from '@/types/collection'

export function ProductPromo({ product }: { product: ProductType }) {
	const promos = product?.sub_product?.filter((subProduct) => subProduct.isPromo)
	return (
		<div className='flex flex-row flex-wrap items-center gap-1'>
			{promos?.map((promo) => (
				<div key={promo.id} className={`text-sm font-semibold text-white p-1 rounded-md px-2.5 py-1 shadow`} style={{ backgroundColor: promo.promo_color! }}>
					{promo.promo_description && <ParseHtml html={promo.promo_description} />}
				</div>
			))}
		</div>
	)
}
