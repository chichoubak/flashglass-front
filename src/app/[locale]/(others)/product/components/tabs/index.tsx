import { ParseHtml } from '@/components/ui/parse-html'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProductType } from '@/types/collection'
import { ListMinusIcon } from 'lucide-react'

const _tabs = (product: ProductType) => [
	{
		key: 'Demande de devis',
		icon: <ListMinusIcon />,
		component: <ParseHtml html={product?.description} />,
	}
]

export function ProductTabs({ product }: { product: ProductType }) {
	const tabs = _tabs(product)
	return (
		<Tabs defaultValue={tabs[0].key} className='max-w-md w-full'>
			<TabsList className='w-full p-0 bg-background justify-start border-b rounded-none lg:gap-2 overflow-y-auto'>
				{tabs.map((tab) => (
					<TabsTrigger
						key={tab.key}
						value={tab.key}
						className='rounded-none bg-background h-full font-medium data-[state=active]:font-semibold data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary'
					>
						<code className='flex items-center gap-2 text-sm lg:text-base [&>svg]:size-5 capitalize'>
							{tab.icon} {tab.key}
						</code>
					</TabsTrigger>
				))}
			</TabsList>

			{tabs.map((tab) => (
				<TabsContent key={tab.key} value={tab.key}>
					<div className='flex flex-col justify-between gap-2 rounded-md p-3 pe-1.5'>{tab.component}</div>
				</TabsContent>
			))}
		</Tabs>
	)
}
