"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useMediaQuery } from "@/hooks/use-media-query";

export function HomeCarousel({
	items,
}: {
	items: {
		image: string;
		url: string;
		title: string;
		buttonCaption: string;
	}[];
}) {
	const plugin = React.useRef(
		Autoplay({ delay: 5000, stopOnInteraction: true })
	);
	const carouselRef = useRef<HTMLDivElement>(null);
	const isMobile = useMediaQuery("(max-width: 768px)");

	useEffect(() => {
		if (!carouselRef.current) return;

		const ctx = gsap.context(() => {
			// Initial fade in of carousel
			gsap.to(carouselRef.current, {
				opacity: 1,
				duration: 1,
				ease: "power2.out",
			});

			// Set up slide content animations
			const slides = document.querySelectorAll(".carousel-content");
			slides.forEach((slide) => {
				gsap.set(slide, { opacity: 0, y: 30 });
			});

			// Create observer for each slide
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							// Slide in animation when visible
							gsap.to(entry.target, {
								opacity: 1,
								y: 0,
								duration: 0.8,
								ease: "power3.out",
							});
						} else {
							// Reset when not visible
							gsap.set(entry.target, {
								opacity: 0,
								y: 30,
							});
						}
					});
				},
				{
					threshold: 0.5,
				}
			);

			// Observe all slides
			slides.forEach((slide) => observer.observe(slide));

			return () => observer.disconnect();
		});

		return () => ctx.revert();
	}, []);

	return (
		<Carousel
			ref={carouselRef}
			dir="ltr"
			plugins={[plugin.current]}
			className="w-full mx-auto relative overflow-hidden opacity-0"
			onMouseEnter={plugin.current.stop}
			onMouseLeave={plugin.current.reset}
		>
			<CarouselContent>
				{items.map((item) => (
					<CarouselItem key={item.title}>
						<Link href={item.url}>
							<div className="relative">
								{/* Mobile-optimized container */}
								<div className="flex aspect-[3/4] sm:aspect-[16/9] md:aspect-[16/6] items-center justify-center relative">
									<Image
										src={item.image || "/placeholder.svg"}
										alt={item.title}
										fill
										className="object-cover"
										priority
									/>
									{/* Enhanced gradient overlay */}
									<div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

									{/* Content container with improved mobile spacing */}
									<div className="carousel-content absolute w-full px-6 sm:px-8 md:px-16 py-8 sm:py-12 md:py-0 md:w-1/2 left-0 top-1/2 transform -translate-y-1/2">
										<div className="space-y-4 sm:space-y-6">
											<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
												{item.title}
											</h2>
											<Button
												className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 transform hover:scale-105 shadow-lg"
												size={isMobile ? "default" : "lg"}
											>
												{item.buttonCaption}
											</Button>
										</div>
									</div>
								</div>
							</div>
						</Link>
					</CarouselItem>
				))}
			</CarouselContent>

			{/* Navigation buttons with improved mobile positioning */}
			<div className="hidden sm:block">
				<CarouselPrevious className="left-4 md:left-8 bg-white/10 hover:bg-white/20 text-white border-none backdrop-blur-sm" />
				<CarouselNext className="right-4 md:right-8 bg-white/10 hover:bg-white/20 text-white border-none backdrop-blur-sm" />
			</div>
		</Carousel>
	);
}
