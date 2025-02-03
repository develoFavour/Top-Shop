"use client";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "./product-card";
import type { IProduct } from "@/lib/db/models/product.model";

interface ProductSliderProps {
	title?: string;
	products: IProduct[];
	hideDetails?: boolean;
}

export default function ProductSlider({
	title,
	products,
	hideDetails = false,
}: ProductSliderProps) {
	if (products.length === 0) {
		return null;
	}

	return (
		<div className="w-full bg-background">
			{title && <h2 className="h2-bold mb-5">{title}</h2>}
			<Carousel
				opts={{
					align: "start",
				}}
				className="w-full"
			>
				<CarouselContent>
					{products.map((product) => (
						<CarouselItem
							key={product.slug}
							className={
								hideDetails
									? "md:basis-1/4 lg:basis-1/6"
									: "md:basis-1/3 lg:basis-1/5"
							}
						>
							<ProductCard
								hideDetails={hideDetails}
								hideAddToCart
								hideBorder
								product={product}
							/>
						</CarouselItem>
					))}
				</CarouselContent>
				{products.length > 1 && (
					<>
						<CarouselPrevious className="left-0" />
						<CarouselNext className="right-0" />
					</>
				)}
			</Carousel>
		</div>
	);
}
