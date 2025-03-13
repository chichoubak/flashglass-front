export interface FaqTranslationType {
	id: number
	faq_id: number
	languages_code: string
	title: string
	description: string
}
export interface FaqType extends FaqTranslationType {
	id: number
	product: number | null
}

export interface ImageType {
	id: number
	product_id: number
	directus_files_id: {
		id: string
		storage: string
		filename_disk: string
		filename_download: string
		title: string
		type: string
		folder: null
		uploaded_by: string
		created_on: string
		modified_by: null
		modified_on: string
		charset: null
		filesize: string
		width: number
		height: number
		duration: null
		embed: null
		description: null
		location: null
		tags: null
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		metadata: Record<string, any>
		focal_point_x: null
		focal_point_y: null
		tus_id: null
		tus_data: null
		uploaded_on: string
	}
}

export interface ProductTranslationType {
	id: number
	product_id: number
	languages_code: string
	title: string
	description: string
	details: string | null
}

export interface SubProductTranslationType {
	id: number
	sub_product_id: number
	languages_code: string
	title: string
	promo_description: string | null
}

export interface SubProductType extends SubProductTranslationType {
	id: number
	status: string
	sort: null
	user_created: string
	date_created: string
	user_updated: string
	date_updated: string
	price: number
	short_description: string | null
	width: string
	height: string
	avatar: string
	isPromo: boolean
	product: number
	quantity: number | null
	promo_color: string | null
	translations: SubProductTranslationType[]
}
export interface ProductType extends ProductTranslationType {
	id: number
	status: string
	sort: null
	user_created: string
	date_created: string
	user_updated: string
	date_updated: string
	category: number
	faq: null
	order: number
	min: number
	max: number
	translations: ProductTranslationType[]
	images: ImageType[]
	avatar: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	delivery: any[]
	sub_product: SubProductType[]
}

export interface CategoryTranslationType {
	id: number
	category_id: number
	languages_code: string
	title: string
	short_description: string
	cta_label: string
	description: string
}

export interface CategoryType extends CategoryTranslationType {
	id: number
	status: string
	sort: null
	user_created: string
	date_created: string
	user_updated: string
	date_updated: string
	avatar: string
	color: string
	isSpecial: boolean
	order: number
	translations: CategoryTranslationType[]
	products: ProductType[]
	faq: FaqType[] | null
}
