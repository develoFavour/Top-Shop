import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ProductSlider from "@/components/product/product-slider";
import ProductGallery from "@/components/product/product-gallery";
import Rating from "@/components/product/rating";
import ProductPrice from "@/components/product/product-price";
import SelectVariant from "@/components/product/select-variant";

import ProductInfo from "@/components/product/product-info";
import {
	getProductBySlug,
	getRelatedProductsByCategory,
} from "@/lib/actions/product.action";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import ProductDetailsLoading from "./loading";

export async function generateMetadata(props: {
	params: Promise<{ slug: string }>;
}) {
	const params = await props.params;
	const product = await getProductBySlug(params.slug);
	if (!product) {
		return { title: "Product not found" };
	}
	return {
		title: product.name,
		description: product.description,
		openGraph: {
			images: [{ url: product.images[0] }],
		},
	};
}

export default async function ProductDetails(props: {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ page: string; color: string; size: string }>;
}) {
	const searchParams = await props.searchParams;
	const { page, color, size } = searchParams;
	const params = await props.params;
	const { slug } = params;
	const product = await getProductBySlug(slug);
	const relatedProducts = await getRelatedProductsByCategory({
		category: product.category,
		productId: product._id,
		page: Number(page || "1"),
	});

	return (
		<Suspense fallback={<ProductDetailsLoading />}>
			<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
				<section className="bg-white rounded-lg shadow-sm">
					<div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-8">
						{/* Product Gallery - Full width on mobile, 2 columns on desktop */}
						<div className="w-full lg:col-span-2 p-4">
							<ProductGallery images={product.images} />
						</div>

						{/* Product Information */}
						<div className="w-full lg:col-span-2 p-4 lg:p-6 space-y-6">
							<div className="space-y-4">
								<div className="flex flex-wrap gap-2">
									<Badge variant="secondary" className="text-xs sm:text-sm">
										{product.brand}
									</Badge>
									<Badge variant="outline" className="text-xs sm:text-sm">
										{product.category}
									</Badge>
									{product.tags.map((tag) => (
										<Badge
											key={tag}
											variant="secondary"
											className={cn(
												"text-xs sm:text-sm",
												tag === "todays-deal" && "bg-red-100 text-red-800"
											)}
										>
											{tag}
										</Badge>
									))}
								</div>

								<h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
									{product.name}
								</h1>

								<div className="flex items-center gap-2">
									<Rating rating={product.avgRating} showNumber size={4} />
									<span className="text-sm text-gray-500">
										({product.numReviews} reviews)
									</span>
								</div>

								<Separator />

								<ProductPrice
									price={product.price}
									listPrice={product.listPrice}
									isDeal={product.tags.includes("todays-deal")}
									forListing={false}
									className="text-xl sm:text-2xl"
								/>
							</div>

							<SelectVariant
								product={product}
								size={size || product.sizes[0]}
								color={color || product.colors[0]}
							/>

							<Separator />

							<ProductInfo description={product.description} />
						</div>

						{/* Purchase Card */}
						<div className="w-full lg:col-span-1 p-4">
							<Card className="sticky top-4">
								<CardContent className="p-4 space-y-4">
									<ProductPrice price={product.price} className="text-2xl" />

									<div className="space-y-2">
										{product.countInStock > 0 ? (
											<>
												<div className="text-green-700 flex items-center gap-2">
													<div className="w-2 h-2 rounded-full bg-green-700" />
													<span>In Stock</span>
												</div>
												{product.countInStock <= 3 && (
													<p className="text-red-600 text-sm font-medium">
														Only {product.countInStock} left - order soon
													</p>
												)}
											</>
										) : (
											<div className="text-red-600 flex items-center gap-2">
												<div className="w-2 h-2 rounded-full bg-red-600" />
												<span>Out of Stock</span>
											</div>
										)}
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>

				<section className="mt-8">
					<ProductSlider
						products={relatedProducts.data}
						title={`Best Sellers in ${product.category}`}
					/>
				</section>
			</div>
		</Suspense>
	);
}
