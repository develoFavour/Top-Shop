import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constant";

export default function EmptyCart() {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5 }}
			className="text-center py-16 bg-white rounded-lg shadow-md"
		>
			<ShoppingCart className="mx-auto h-24 w-24 text-gray-400 mb-4" />
			<h2 className="text-3xl font-bold mb-2">Your Shopping Cart is empty</h2>
			<p className="text-gray-600 mb-8">
				Looks like you haven&apos;t added any items to your cart yet.
			</p>
			<Button asChild>
				<Link href="/">Continue shopping on {APP_NAME}</Link>
			</Button>
		</motion.div>
	);
}
