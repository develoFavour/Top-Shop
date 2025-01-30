"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ImageHoverProps {
	src: string;
	hoverSrc: string;
	alt: string;
}

const ImageHover = ({ src, hoverSrc, alt }: ImageHoverProps) => {
	const [isHovered, setIsHovered] = useState(false);
	const hoverTimeoutRef = useRef<NodeJS.Timeout>(null);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		return () => {
			if (hoverTimeoutRef.current) {
				clearTimeout(hoverTimeoutRef.current);
			}
		};
	}, []);

	const handleMouseEnter = () => {
		hoverTimeoutRef.current = setTimeout(() => setIsHovered(true), 500); // Reduced delay to 500ms
	};

	const handleMouseLeave = () => {
		if (hoverTimeoutRef.current) {
			clearTimeout(hoverTimeoutRef.current);
		}
		setIsHovered(false);
	};

	return (
		<div
			className="relative h-52 overflow-hidden group"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<Image
				src={src || "/placeholder.svg"}
				alt={alt}
				fill
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				className={cn(
					"object-contain transition-all duration-700",
					isHovered ? "opacity-0 scale-95" : "opacity-100 scale-100",
					!isLoaded && "blur-sm"
				)}
				onLoad={() => setIsLoaded(true)}
				priority
			/>
			<Image
				src={hoverSrc || "/placeholder.svg"}
				alt={`${alt} hover view`}
				fill
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				className={cn(
					"absolute inset-0 object-contain transition-all duration-700",
					isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95",
					!isLoaded && "blur-sm"
				)}
				onLoad={() => setIsLoaded(true)}
			/>
			<div
				className={cn(
					"absolute inset-0 bg-black/5 transition-opacity duration-300",
					isHovered ? "opacity-100" : "opacity-0"
				)}
			/>
		</div>
	);
};

export default ImageHover;
