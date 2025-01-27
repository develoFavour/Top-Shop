"use client";

import { APP_NAME } from "@/lib/constant";
import Image from "next/image";
import Link from "next/link";
import Menu from "./menu";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import data from "@/lib/data";
import Search from "./search";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Header() {
	const headerRef = useRef(null);
	const searchRef = useRef(null);
	const menuRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Initial animation
			gsap.from(headerRef.current, {
				y: -100,
				opacity: 0,
				duration: 0.8,
				ease: "power3.out",
			});

			// Stagger animation for menu items
			gsap.from(".nav-item", {
				y: -20,
				opacity: 0,
				stagger: 0.1,
				duration: 0.6,
				delay: 0.4,
				ease: "power2.out",
			});

			// Search bar animation
			gsap.from(searchRef.current, {
				scale: 0.8,
				opacity: 0,
				duration: 0.6,
				delay: 0.2,
				ease: "back.out(1.7)",
			});

			// Menu animation
			gsap.from(menuRef.current, {
				x: 50,
				opacity: 0,
				duration: 0.6,
				delay: 0.3,
				ease: "power2.out",
			});
		});

		return () => ctx.revert();
	}, []);

	return (
		<header ref={headerRef} className="glass-effect sticky top-0 z-50">
			<div className="px-4 py-2 max-w-7xl mx-auto">
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<Link
							href="/"
							className="flex items-center header-button font-extrabold text-2xl"
						>
							<Image
								src="/icon/logo.svg"
								width={40}
								height={40}
								alt={`${APP_NAME} logo`}
								className="mr-2"
							/>
							<span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
								{APP_NAME}
							</span>
						</Link>
					</div>
					<div ref={searchRef} className="hidden md:block flex-1 max-w-xl px-4">
						<Search />
					</div>
					<div ref={menuRef}>
						<Menu />
					</div>
				</div>
				<div className="md:hidden block py-2">
					<Search />
				</div>
			</div>
			<nav className="bg-secondary/50 backdrop-blur-lg">
				<div className="flex items-center px-4 py-2 max-w-7xl mx-auto overflow-x-auto">
					<Button
						variant="ghost"
						className="header-button flex items-center gap-1 text-base [&_svg]:size-6"
					>
						<MenuIcon />
						All
					</Button>
					<div className="flex items-center gap-4">
						{data.headerMenus.map((menu) => (
							<Link
								href={menu.href}
								key={menu.href}
								className="nav-item px-3 py-2 text-sm font-medium"
							>
								{menu.name}
							</Link>
						))}
					</div>
				</div>
			</nav>
		</header>
	);
}
