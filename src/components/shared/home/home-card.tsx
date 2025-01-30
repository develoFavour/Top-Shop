"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type CardItem = {
	title: string;
	link: { text: string; href: string };
	items: {
		name: string;
		items?: string[];
		image: string;
		href: string;
	}[];
};

export function HomeCard({ cards }: { cards: CardItem[] }) {
	const containerRef = useRef<HTMLDivElement>(null);
	const cardsRef = useRef<HTMLDivElement[]>([]);

	useEffect(() => {
		if (!containerRef.current) return;

		const ctx = gsap.context(() => {
			// Initial state
			gsap.set(cardsRef.current, {
				opacity: 0,
				y: 50,
			});

			// Animate cards when they come into view
			cardsRef.current.forEach((card) => {
				if (!card) return;

				gsap.to(card, {
					opacity: 1,
					y: 0,
					duration: 0.8,
					ease: "power3.out",
					scrollTrigger: {
						trigger: card,
						start: "top bottom-=100",
						end: "bottom center",
						toggleActions: "play none none reverse",
					},
				});

				// Safely type and select elements
				const images = card.querySelectorAll<HTMLElement>(".card-image");
				const texts = card.querySelectorAll<HTMLElement>(".card-text");
				const footer = card.querySelector<HTMLElement>(".card-footer");

				// Animate images if they exist
				if (images.length > 0) {
					gsap.from(Array.from(images), {
						scale: 0.8,
						opacity: 0,
						duration: 0.6,
						stagger: 0.1,
						ease: "back.out(1.7)",
						scrollTrigger: {
							trigger: card,
							start: "top bottom-=100",
							end: "bottom center",
							toggleActions: "play none none reverse",
						},
					});
				}

				// Animate texts if they exist
				if (texts.length > 0) {
					gsap.from(Array.from(texts), {
						y: 20,
						opacity: 0,
						duration: 0.6,
						stagger: 0.1,
						ease: "power3.out",
						delay: 0.2,
						scrollTrigger: {
							trigger: card,
							start: "top bottom-=100",
							end: "bottom center",
							toggleActions: "play none none reverse",
						},
					});
				}

				// Animate footer if it exists
				if (footer) {
					gsap.from(footer, {
						y: 20,
						opacity: 0,
						duration: 0.6,
						ease: "power3.out",
						delay: 0.4,
						scrollTrigger: {
							trigger: card,
							start: "top bottom-=100",
							end: "bottom center",
							toggleActions: "play none none reverse",
						},
					});
				}
			});
		});

		return () => ctx.revert();
	}, []);

	return (
		<div
			ref={containerRef}
			className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-4"
		>
			{cards.map((card, index) => (
				<Card
					key={card.title}
					ref={(el) => {
						if (el) cardsRef.current[index] = el;
					}}
					className="rounded-none flex flex-col transform-gpu hover:scale-[1.02] transition-transform duration-300 hover:shadow-xl"
				>
					<CardContent className="p-4 flex-1">
						<h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
							{card.title}
						</h3>
						<div className="grid grid-cols-2 gap-4">
							{card.items.map((item) => (
								<Link
									key={item.name}
									href={item.href}
									className="flex flex-col group"
								>
									<div className="overflow-hidden rounded-lg">
										<Image
											src={item.image || "/placeholder.svg"}
											alt={item.name}
											className="card-image aspect-square object-scale-down max-w-full h-auto mx-auto transform-gpu group-hover:scale-110 transition-transform duration-300"
											height={120}
											width={120}
										/>
									</div>
									<p className="card-text text-center text-sm whitespace-nowrap overflow-hidden text-ellipsis mt-2 group-hover:text-primary transition-colors duration-300">
										{item.name}
									</p>
								</Link>
							))}
						</div>
					</CardContent>
					{card.link && (
						<CardFooter className="card-footer">
							<Link
								href={card.link.href}
								className="mt-4 block text-primary hover:text-primary/80 transition-colors duration-300 underline-offset-4 hover:underline"
							>
								{card.link.text}
							</Link>
						</CardFooter>
					)}
				</Card>
			))}
		</div>
	);
}
