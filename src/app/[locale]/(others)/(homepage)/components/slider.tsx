'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { CustomImage } from '@/components/ui/image'
import { CategoryType } from '@/types/collection'
import Autoplay from 'embla-carousel-autoplay'
import { useRef } from 'react'

export function HomepageSlider({ data }: { data: CategoryType[] }) {
	const plugin = useRef(
		Autoplay({ delay: 2000, stopOnInteraction: false }) // Important : stopOnInteraction = false
	)

	// Pause le carrousel au survol ou au toucher, puis redémarre après 3 secondes
	const handleInteraction = () => {
		plugin.current.stop()
		setTimeout(() => {
			plugin.current.play() // Reprend après 3 secondes
		}, 3000)
	}


	const filteredSlides = data

	return (
		<div className="relative w-full flex justify-center">
			<Carousel plugins={[plugin.current]} className="w-[90vw] max-w-[90vw]" onMouseLeave={plugin.current.reset} onMouseEnter={handleInteraction} onTouchStart={handleInteraction}>
				<CarouselContent>
					{filteredSlides.map((category) => (
						<CarouselItem key={category?.id}>
							<div className="">
								<Card className="relative overflow-hidden">
									<CardContent className="grid grid-cols-1 grid-rows-[2fr_1fr] lg:grid-rows-1 lg:grid-cols-[1fr_2fr] h-[450px] lg:h-[500px] items-center justify-center p-0">
										<header
											className="flex flex-col lg:justify-center relative w-full h-full p-5 lg:p-10 gap-2 lg:gap-4 order-2 lg:order-[unset] text-white"
											style={{ backgroundColor: category?.color ?? '#DE182F' }}
										>
											<h1 className="relative text-2xl font-semibold z-10 text-white">{category?.title}</h1>
											<p className="relative z-10 line-clamp-3 lg:line-clamp-none text-gray">{category?.short_description}</p>
										</header>
										<div className="relative w-full h-full">
											<CustomImage src={category?.avatar} alt={category?.title} fill className="object-cover" />
										</div>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>

				{/* Flèches de navigation visibles uniquement sur desktop */}
				<div className="hidden lg:block">
					<CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10" />
					<CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10" />
				</div>
			</Carousel>
		</div>
	)
}
