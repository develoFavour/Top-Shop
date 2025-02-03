"use client";

import { UserIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import CartButton from "./cart-button";

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

			<CartButton />
		</nav>
	);
}
