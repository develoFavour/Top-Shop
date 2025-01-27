"use client";

import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { APP_NAME } from "@/lib/constant";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
	const [showScrollTop, setShowScrollTop] = useState(false);
	const footerRef = useRef(null);
	const scrollTopRef = useRef(null);

	useEffect(() => {
		const handleScroll = () => {
			setShowScrollTop(window.scrollY > 300);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Animate footer sections
			gsap.from(".footer-section", {
				y: 50,
				opacity: 0,
				stagger: 0.1,
				duration: 0.8,
				ease: "power3.out",
				scrollTrigger: {
					trigger: footerRef.current,
					start: "top bottom-=100",
				},
			});

			// Animate copyright info
			gsap.from(".copyright-info", {
				opacity: 0,
				duration: 1,
				delay: 0.5,
				ease: "power2.out",
				scrollTrigger: {
					trigger: footerRef.current,
					start: "top bottom-=50",
				},
			});
		});

		return () => ctx.revert();
	}, []);

	const scrollToTop = () => {
		gsap.to(window, { duration: 1, scrollTo: 0, ease: "power3.inOut" });
	};

	return (
		<footer
			ref={footerRef}
			className="bg-gradient-to-b from-background to-secondary text-foreground relative"
		>
			<div className="w-full">
				<Button
					variant="ghost"
					className="bg-primary/10 w-full rounded-none py-6 text-lg font-medium hover:bg-primary/20 transition-colors duration-300"
					onClick={scrollToTop}
				>
					<ChevronUp className="mr-2 h-5 w-5" />
					Back to top
				</Button>
			</div>
			<div className="p-8 max-w-7xl mx-auto">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-12">
					<div className="footer-section">
						<h3 className="font-bold mb-4 text-lg text-primary">
							Get to Know Us
						</h3>
						<ul className="space-y-3">
							<li>
								<Link
									href="/about"
									className="hover:text-primary transition-colors duration-200"
								>
									About Us
								</Link>
							</li>
							<li>
								<Link
									href="/careers"
									className="hover:text-primary transition-colors duration-200"
								>
									Careers
								</Link>
							</li>
							<li>
								<Link
									href="/press"
									className="hover:text-primary transition-colors duration-200"
								>
									Press Releases
								</Link>
							</li>
						</ul>
					</div>
					<div className="footer-section">
						<h3 className="font-bold mb-4 text-lg text-primary">
							Make Money with Us
						</h3>
						<ul className="space-y-3">
							<li>
								<Link
									href="/sell"
									className="hover:text-primary transition-colors duration-200"
								>
									Sell products on {APP_NAME}
								</Link>
							</li>
							<li>
								<Link
									href="/affiliate"
									className="hover:text-primary transition-colors duration-200"
								>
									Become an Affiliate
								</Link>
							</li>
							<li>
								<Link
									href="/advertise"
									className="hover:text-primary transition-colors duration-200"
								>
									Advertise Your Products
								</Link>
							</li>
						</ul>
					</div>
					<div className="footer-section">
						<h3 className="font-bold mb-4 text-lg text-primary">
							Payment Products
						</h3>
						<ul className="space-y-3">
							<li>
								<Link
									href="/card"
									className="hover:text-primary transition-colors duration-200"
								>
									{APP_NAME} Rewards Visa Card
								</Link>
							</li>
							<li>
								<Link
									href="/credit"
									className="hover:text-primary transition-colors duration-200"
								>
									{APP_NAME} Store Card
								</Link>
							</li>
							<li>
								<Link
									href="/business"
									className="hover:text-primary transition-colors duration-200"
								>
									{APP_NAME} Business Card
								</Link>
							</li>
						</ul>
					</div>
					<div className="footer-section">
						<h3 className="font-bold mb-4 text-lg text-primary">
							Let Us Help You
						</h3>
						<ul className="space-y-3">
							<li>
								<Link
									href="/account"
									className="hover:text-primary transition-colors duration-200"
								>
									Your Account
								</Link>
							</li>
							<li>
								<Link
									href="/orders"
									className="hover:text-primary transition-colors duration-200"
								>
									Your Orders
								</Link>
							</li>
							<li>
								<Link
									href="/help"
									className="hover:text-primary transition-colors duration-200"
								>
									Help Center
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="mt-12 pt-8 border-t border-border/50">
					<div className="flex flex-wrap justify-center gap-6 text-sm copyright-info">
						<Link
							href="/page/conditions-of-use"
							className="hover:text-primary transition-colors duration-200"
						>
							Conditions of Use
						</Link>
						<Link
							href="/page/privacy-policy"
							className="hover:text-primary transition-colors duration-200"
						>
							Privacy Notice
						</Link>
						<Link
							href="/page/help"
							className="hover:text-primary transition-colors duration-200"
						>
							Help
						</Link>
					</div>
					<div className="mt-6 text-center text-sm copyright-info">
						<p>© 2000-2024, {APP_NAME}, Inc. or its affiliates</p>
					</div>
					<div className="mt-4 text-center text-sm text-muted-foreground copyright-info">
						123 Main Street, Anytown, CA, 12345 | +1 (123) 456-7890
					</div>
				</div>
			</div>
			{showScrollTop && (
				<Button
					ref={scrollTopRef}
					variant="secondary"
					className="fixed bottom-8 right-8 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90"
					onClick={scrollToTop}
				>
					<ChevronUp className="h-6 w-6" />
				</Button>
			)}
		</footer>
	);
}
