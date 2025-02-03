"use client";

import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import useIsMounted from "@/hooks/use-is-mounted";
import { cn } from "@/lib/utils";
import useCartStore from "@/hooks/use-cart-store";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function CartButton() {
	const isMounted = useIsMounted();
	const {
		cart: { items },
	} = useCartStore();
	const cartItemsCount = items.reduce((a, c) => a + c.quantity, 0);
	const cartCountRef = useRef(null);

	useEffect(() => {
		if (isMounted && cartCountRef.current) {
			gsap.from(cartCountRef.current, {
				scale: 0,
				duration: 0.3,
				ease: "back.out(2)",
			});
		}
	}, [isMounted]);

	return (
		<Link
			href="/cart"
			className="header-button relative group ml-1 sm:ml-2"
			aria-label="Cart"
		>
			<div className="flex items-center">
				<div className="relative">
					<ShoppingCartIcon className="h-5 w-5 sm:h-6 sm:w-6" />
					{isMounted && (
						<span
							ref={cartCountRef}
							className={cn(
								"absolute -top-1 -right-1 bg-primary text-white text-[10px] sm:text-xs rounded-full w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center",
								cartItemsCount >= 10 && "text-[8px] sm:text-[10px]"
							)}
						>
							{cartItemsCount}
						</span>
					)}
				</div>
				<span className="text-xs sm:text-sm font-medium hidden sm:inline ml-1">
					Cart
				</span>
			</div>
		</Link>
	);
}
