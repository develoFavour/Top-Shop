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
	const carouselRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from(carouselRef.current, {
				opacity: 0,
				duration: 1,
				ease: "power3.out",
			});

			const tl = gsap.timeline({ repeat: -1 });

			items.forEach((_, index) => {
				tl.to(`.carousel-item-${index} .carousel-content`, {
					opacity: 1,
					y: 0,
					duration: 1,
					ease: "power3.out",
				}).to(
					`.carousel-item-${index} .carousel-content`,
					{
						opacity: 0,
						y: 50,
						duration: 1,
						ease: "power3.in",
					},
					"+=4"
				);
			});
		});

		return () => ctx.revert();
	}, [items]);

	return (
		<Carousel
			ref={carouselRef}
			dir="ltr"
			plugins={[plugin.current]}
			className="w-full mx-auto relative overflow-hidden rounded-xl shadow-2xl"
			onMouseEnter={plugin.current.stop}
			onMouseLeave={plugin.current.reset}
		>
			<CarouselContent>
				{items.map((item, index) => (
					<CarouselItem key={item.title} className={`carousel-item-${index}`}>
						<Link href={item.url}>
							<div className="flex aspect-[16/6] items-center justify-center p-6 relative">
								<Image
									src={item.image || "/placeholder.svg"}
									alt={item.title}
									fill
									className="object-cover"
									priority
								/>
								<div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
								<div className="carousel-content absolute w-full md:w-1/2 left-8 md:left-16 top-1/2 transform text-white opacity-0 translate-y-8">
									<h2 className="text-2xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
										{item.title}
									</h2>
									<Button
										className="hidden md:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 transform hover:scale-105"
										size="lg"
									>
										{item.buttonCaption}
									</Button>
								</div>
							</div>
						</Link>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className="left-4 md:left-8 bg-white/10 hover:bg-white/20 text-white border-none" />
			<CarouselNext className="right-4 md:right-8 bg-white/10 hover:bg-white/20 text-white border-none" />
		</Carousel>
	);
}
