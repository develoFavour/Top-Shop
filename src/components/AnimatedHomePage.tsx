"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HomeCard } from "@/components/shared/home/home-card";
import { HomeCarousel } from "@/components/shared/home/home-carousel";

gsap.registerPlugin(ScrollTrigger);

// Define more specific types for our props
interface CarouselItem {
	image: string;
	url: string;
	title: string;
	buttonCaption: string;
}

interface CardItem {
	title: string;
	link: { text: string; href: string };
	items: {
		name: string;
		image: string;
		href: string;
	}[];
}

interface AnimatedHomePageProps {
	carouselItems: CarouselItem[];
	cards: CardItem[];
}

export default function AnimatedHomePage({
	carouselItems,
	cards,
}: AnimatedHomePageProps) {
	const carouselRef = useRef<HTMLDivElement>(null);
	const cardsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!carouselRef.current || !cardsRef.current) return;

		const ctx = gsap.context(() => {
			// Parallax effect for carousel
			gsap.to(carouselRef.current, {
				y: "30%",
				ease: "none",
				scrollTrigger: {
					trigger: carouselRef.current,
					start: "top top",
					end: "bottom top",
					scrub: true,
				},
			});

			// Convert HTMLCollection to an array before animating
			const cardElements = Array.from(cardsRef.current?.children ?? []);

			if (cardElements.length > 0) {
				gsap.from(cardElements, {
					y: 100,
					opacity: 0,
					stagger: 0.15, // Faster stagger for a smoother look
					duration: 1,
					ease: "power3.out",
					scrollTrigger: {
						trigger: cardsRef.current,
						start: "top bottom-=10%",
						end: "bottom center",
						toggleActions: "play none none reverse", // Reverse on scroll back
						once: false, // Set to true if you only want it to animate once
					},
				});
			}
		});

		return () => ctx.revert();
	}, []);

	return (
		<div className="overflow-hidden">
			<div ref={carouselRef} className="relative z-10">
				<HomeCarousel items={carouselItems} />
			</div>
			<div
				ref={cardsRef}
				className="relative z-20 bg-gradient-to-b from-background to-background/80 backdrop-blur-sm md:p-4 md:space-y-4"
			>
				<HomeCard cards={cards} />
			</div>
		</div>
	);
}
