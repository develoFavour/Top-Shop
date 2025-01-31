"use client";

import { ShoppingCartIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Menu() {
	const cartCountRef = useRef(null);

	useEffect(() => {
		gsap.from(cartCountRef.current, {
			scale: 0,
			duration: 0.3,
			ease: "back.out(2)",
		});
	}, []);

	return (
		<nav className="flex items-center">
			<Link
				href="/signin"
				className="header-button bg-primary/5 hover:bg-primary/10 hidden sm:flex items-center gap-1"
			>
				<UserIcon className="h-4 w-4 sm:h-5 sm:w-5" />
				<span className="text-xs sm:text-sm font-medium">Sign in</span>
			</Link>
			<Link
				href="/signin"
				className="header-button bg-primary/5 hover:bg-primary/10 sm:hidden"
				aria-label="Sign in"
			>
				<UserIcon className="h-5 w-5" />
			</Link>
			<Link
				href="/cart"
				className="header-button relative group ml-1 sm:ml-2"
				aria-label="Cart"
			>
				<div className="flex items-center">
					<div className="relative">
						<ShoppingCartIcon className="h-5 w-5 sm:h-6 sm:w-6" />
						<span
							ref={cartCountRef}
							className="absolute -top-1 -right-1 bg-primary text-white text-[10px] sm:text-xs rounded-full w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center"
						>
							0
						</span>
					</div>
					<span className="text-xs sm:text-sm font-medium hidden sm:inline ml-1">
						Cart
					</span>
				</div>
			</Link>
		</nav>
	);
}
