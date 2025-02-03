"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import BrowsingHistoryList from "@/components/shared/browsing-history-list";
import useCartStore from "@/hooks/use-cart-store";
import { useRouter } from "next/navigation";
import CartItem from "@/components/cart/cart-item";
import EmptyCart from "@/components/cart/empty-cart";
import CartSummary from "@/components/cart/cart-summary";

interface CartItem {
	clientId: string;
	product: string;
	name: string;
	slug: string;
	category: string;
	quantity: number;
	countInStock: number;
	image: string;
	price: number;
	size?: string;
	color?: string;
}

export default function CartPage() {
	const {
		cart: { items, itemsPrice },
		updateItem,
		removeItem,
	} = useCartStore();
	const router = useRouter();

	useEffect(() => {
		document.body.style.backgroundColor = "#f7f7f7";
		return () => {
			document.body.style.backgroundColor = "";
		};
	}, []);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="container mx-auto px-4 py-8"
		>
			<h1 className="text-4xl font-bold mb-8 text-center">Your Cart</h1>
			{items.length === 0 ? (
				<EmptyCart />
			) : (
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2">
						<div className="bg-white shadow-lg rounded-lg overflow-hidden">
							<div className="border-b p-4">
								<h2 className="text-2xl font-semibold">Shopping Cart</h2>
							</div>
							<div className="divide-y">
								{items.map((item: CartItem) => (
									<CartItem
										key={item.clientId}
										item={item}
										updateItem={updateItem}
										removeItem={removeItem}
									/>
								))}
							</div>
						</div>
					</div>
					<div className="lg:col-span-1">
						<CartSummary
							items={items}
							itemsPrice={itemsPrice}
							onCheckout={() => router.push("/checkout")}
						/>
					</div>
				</div>
			)}
			<BrowsingHistoryList className="mt-16" />
		</motion.div>
	);
}
