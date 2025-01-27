"use client";

import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
// import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Menu() {
	const cartCountRef = useRef(null);

	useEffect(() => {
		// Animate cart count when it changes
		gsap.from(cartCountRef.current, {
			scale: 0,
			duration: 0.3,
			ease: "back.out(2)",
		});
	}, []);

	return (
		<div className="flex justify-end">
			<nav className="flex gap-4 w-full items-center">
				<Link
					href="/signin"
					className="header-button bg-primary/5 hover:bg-primary/10"
				>
					<span className="text-sm font-medium">Hello, Sign in</span>
				</Link>
				<Link href="/cart" className="header-button relative group">
					<div className="flex items-center gap-2">
						<div className="relative">
							<ShoppingCartIcon className="h-6 w-6" />
							<span
								ref={cartCountRef}
								className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
							>
								0
							</span>
						</div>
						<span className="text-sm font-medium">Cart</span>
					</div>
				</Link>
			</nav>
		</div>
	);
}
