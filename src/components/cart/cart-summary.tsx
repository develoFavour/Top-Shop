import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProductPrice from "@/components/product/product-price";
import { FREE_SHIPPING_MIN_PRICE } from "@/lib/constant";

interface CartSummaryProps {
	items: Array<{ quantity: number }>;
	itemsPrice: number;
	onCheckout: () => void;
}

export default function CartSummary({
	items,
	itemsPrice,
	onCheckout,
}: CartSummaryProps) {
	const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
	const isEligibleForFreeShipping = itemsPrice >= FREE_SHIPPING_MIN_PRICE;

	return (
		<Card className="shadow-lg">
			<CardContent className="p-6 space-y-4">
				<h3 className="text-xl font-semibold mb-4">Order Summary</h3>
				<div className="flex justify-between">
					<span>Subtotal ({itemCount} items)</span>
					<ProductPrice price={itemsPrice} className="font-medium" />
				</div>
				<div className="flex justify-between text-sm">
					<span>Estimated shipping</span>
					<span>
						{isEligibleForFreeShipping ? "Free" : "Calculated at checkout"}
					</span>
				</div>
				<div className="border-t pt-4">
					<div className="flex justify-between text-lg font-bold">
						<span>Total</span>
						<ProductPrice price={itemsPrice} />
					</div>
				</div>
				<Button onClick={onCheckout} className="w-full">
					Proceed to Checkout
				</Button>
				{!isEligibleForFreeShipping && (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="text-sm text-gray-600 mt-4"
					>
						Add{" "}
						<ProductPrice
							price={FREE_SHIPPING_MIN_PRICE - itemsPrice}
							className="font-medium text-green-600"
						/>{" "}
						more to your order for FREE Shipping!
					</motion.div>
				)}
				{isEligibleForFreeShipping && (
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="text-sm text-green-600 font-medium mt-4"
					>
						Your order qualifies for FREE Shipping!
					</motion.div>
				)}
			</CardContent>
		</Card>
	);
}
