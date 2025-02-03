import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ProductPrice from "@/components/product/product-price";

interface CartItemProps {
	item: {
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
	};
	updateItem: (item: CartItemProps["item"], quantity: number) => void;
	removeItem: (item: CartItemProps["item"]) => void;
}

export default function CartItem({
	item,
	updateItem,
	removeItem,
}: CartItemProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.3 }}
			className="py-6 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6"
		>
			<Link href={`/product/${item.slug}`} className="shrink-0">
				<div className="relative w-24 h-24 sm:w-32 sm:h-32">
					<Image
						src={item.image || "/placeholder.svg"}
						alt={item.name}
						fill
						sizes="(max-width: 768px) 96px, 128px"
						className="object-contain rounded-md"
					/>
				</div>
			</Link>
			<div className="flex-grow space-y-2">
				<Link
					href={`/product/${item.slug}`}
					className="text-lg font-medium hover:underline"
				>
					{item.name}
				</Link>
				{(item.color || item.size) && (
					<div className="text-sm text-gray-500">
						{item.color && (
							<>
								<span className="font-medium">Color:</span> {item.color}
								{item.size && <span className="mx-2">|</span>}
							</>
						)}
						{item.size && (
							<>
								<span className="font-medium">Size:</span> {item.size}
							</>
						)}
					</div>
				)}
				<div className="flex items-center space-x-4">
					<Select
						value={item.quantity.toString()}
						onValueChange={(value) => updateItem(item, Number(value))}
					>
						<SelectTrigger className="w-24">
							<SelectValue>Qty: {item.quantity}</SelectValue>
						</SelectTrigger>
						<SelectContent>
							{Array.from({ length: item.countInStock }).map((_, i) => (
								<SelectItem key={i + 1} value={`${i + 1}`}>
									{i + 1}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Button variant="ghost" size="sm" onClick={() => removeItem(item)}>
						Remove
					</Button>
				</div>
			</div>
			<div className="text-right">
				<ProductPrice
					price={item.price * item.quantity}
					className="text-lg font-bold"
				/>
				{item.quantity > 1 && (
					<div className="text-sm text-gray-500">
						({item.quantity} x <ProductPrice price={item.price} plain />)
					</div>
				)}
			</div>
		</motion.div>
	);
}
