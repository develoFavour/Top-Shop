"use client";

import { APP_NAME } from "@/lib/constant";
import Image from "next/image";
import Link from "next/link";
import Menu from "./menu";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import data from "@/lib/data";
import Search from "./search";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export default function Header() {
	const headerRef = useRef(null);
	const searchRef = useRef(null);
	const menuRef = useRef(null);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
				<div className="flex items-center justify-between gap-4">
					{/* Logo */}
					<Link
						href="/"
						className="flex items-center header-button font-extrabold text-lg sm:text-2xl flex-shrink-0"
					>
						<Image
							src="/logo.svg"
							width={32}
							height={32}
							alt={`${APP_NAME} logo`}
							className="mr-2 sm:w-10 sm:h-10"
						/>
						<span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
							{APP_NAME}
						</span>
					</Link>

					{/* Desktop Search */}
					<div ref={searchRef} className="hidden md:block flex-1 max-w-xl">
						<Search />
					</div>

					{/* Menu */}
					<div ref={menuRef} className="flex-shrink-0">
						<Menu />
					</div>
				</div>

				{/* Mobile Search */}
				<div className="md:hidden mt-2">
					<Search />
				</div>
			</div>

			{/* Navigation */}
			<nav className="bg-secondary/50 backdrop-blur-lg">
				<div className="relative max-w-7xl mx-auto">
					<div className="flex items-center px-4 py-2">
						<Button
							variant="ghost"
							className="header-button flex items-center gap-1 text-sm sm:text-base mr-4 flex-shrink-0"
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						>
							<MenuIcon className="h-5 w-5 sm:h-6 sm:w-6" />
							<span className="hidden xs:inline">All</span>
						</Button>

						{/* Desktop Menu */}
						<div className="hidden sm:flex items-center gap-4 overflow-x-auto no-scrollbar">
							{data.headerMenus.map((menu) => (
								<Link
									href={menu.href}
									key={menu.href}
									className="nav-item whitespace-nowrap px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
								>
									{menu.name}
								</Link>
							))}
						</div>

						{/* Mobile Menu */}
						<div
							className={cn(
								"absolute left-0 right-0 top-full bg-background/95 backdrop-blur-lg sm:hidden",
								isMobileMenuOpen ? "block" : "hidden"
							)}
						>
							<div className="px-4 py-2 flex flex-col gap-2">
								{data.headerMenus.map((menu) => (
									<Link
										href={menu.href}
										key={menu.href}
										className="nav-item px-3 py-2 text-sm font-medium hover:bg-secondary/50 rounded-md transition-colors"
									>
										{menu.name}
									</Link>
								))}
							</div>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
}
