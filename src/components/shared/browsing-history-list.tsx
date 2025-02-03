"use client";
import useBrowsingHistory from "@/hooks/use-browser-history";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import ProductSlider from "../product/product-slider";
import { Button } from "../ui/button";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

export default function BrowsingHistoryList({
	className,
}: {
	className?: string;
}) {
	const { products } = useBrowsingHistory();

	return (
		<div className={cn("bg-background", className)}>
			{products.length > 0 ? (
				<>
					<Separator className="mb-4" />
					<ProductList title="Related to items you've viewed" type="related" />
					<Separator className="my-4" />
					<ProductList
						title="Your browsing history"
						hideDetails
						type="history"
					/>
				</>
			) : (
				<EmptyBrowsingHistory />
			)}
		</div>
	);
}

function ProductList({
	title,
	type = "history",
	hideDetails = false,
}: {
	title: string;
	type: "history" | "related";
	hideDetails?: boolean;
}) {
	const { products } = useBrowsingHistory();
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			setIsLoading(true);
			try {
				const res = await fetch(
					`/api/products/browsing-history?type=${type}&categories=${products
						.map((product) => product.category)
						.join(",")}&ids=${products.map((product) => product.id).join(",")}`
				);
				const fetchedData = await res.json();
				setData(fetchedData);
			} catch (error) {
				console.error(`Error fetching ${type} products:`, error);
			} finally {
				setIsLoading(false);
			}
		};

		if (products.length > 0) {
			fetchProducts();
		} else {
			setIsLoading(false);
		}
	}, [products, type]);

	if (isLoading) {
		return <ProductListSkeleton title={title} />;
	}

	if (data.length === 0) {
		return null; // Don't render anything if there are no products
	}

	return (
		<ProductSlider title={title} products={data} hideDetails={hideDetails} />
	);
}

function EmptyBrowsingHistory() {
	return (
		<div className="text-center py-12">
			<h2 className="text-2xl font-semibold mb-4">
				Your browsing history is empty
			</h2>
			<p className="text-muted-foreground mb-6">
				Start exploring our products to see personalized recommendations!
			</p>
			<Button asChild>
				<Link href="/products">Browse Products</Link>
			</Button>
		</div>
	);
}

function ProductListSkeleton({ title }: { title: string }) {
	return (
		<div className="w-full bg-background">
			<h2 className="h2-bold mb-5">{title}</h2>
			<div className="flex space-x-4 overflow-x-auto pb-4">
				{[...Array(6)].map((_, i) => (
					<Skeleton key={i} className="w-48 h-64 rounded-lg flex-shrink-0" />
				))}
			</div>
		</div>
	);
}
