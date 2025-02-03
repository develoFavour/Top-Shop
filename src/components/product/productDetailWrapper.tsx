"use client";

import useBrowsingHistory from "@/hooks/use-browser-history";
import { useEffect, type ReactNode } from "react";

interface ProductDetailsWrapperProps {
	product: {
		_id: string;
		category: string;
		name: string;
	};
	children: ReactNode;
}

export default function ProductDetailsWrapper({
	product,
	children,
}: ProductDetailsWrapperProps) {
	const { addItem } = useBrowsingHistory();

	useEffect(() => {
		console.log("Adding product to browsing history:", product);
		addItem({ id: product._id, category: product.category });
	}, [product, addItem]);

	return <>{children}</>;
}
