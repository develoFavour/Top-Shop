"use client";

import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
	rating: number;
	size?: number;
	className?: string;
	showNumber?: boolean;
	interactive?: boolean;
	onChange?: (rating: number) => void;
}

export default function Rating({
	rating = 0,
	size = 6,
	className,
	showNumber = false,
	interactive = false,
	onChange,
}: RatingProps) {
	const fullStars = Math.floor(rating);
	const partialStar = rating % 1;
	const emptyStars = 5 - Math.ceil(rating);
	const [hoverRating, setHoverRating] = React.useState<number | null>(null);

	const displayRating = hoverRating !== null ? hoverRating : rating;

	return (
		<div className="flex items-center gap-2">
			<div
				className={cn("flex items-center", className)}
				role={interactive ? "slider" : "presentation"}
				aria-label={`Rating: ${rating} out of 5 stars`}
				aria-valuemin={0}
				aria-valuemax={5}
				aria-valuenow={displayRating}
			>
				{[...Array(fullStars)].map((_, i) => (
					<Star
						key={`full-${i}`}
						className={cn(
							`w-${size} h-${size} fill-primary text-primary transition-all duration-300`,
							interactive && "cursor-pointer hover:scale-110"
						)}
						onMouseEnter={() => interactive && setHoverRating(i + 1)}
						onClick={() => interactive && onChange?.(i + 1)}
					/>
				))}
				{partialStar > 0 && (
					<div
						className="relative"
						onMouseEnter={() => interactive && setHoverRating(fullStars + 1)}
						onClick={() => interactive && onChange?.(fullStars + 1)}
					>
						<Star className={`w-${size} h-${size} text-primary`} />
						<div
							className="absolute top-0 left-0 overflow-hidden transition-all duration-300"
							style={{ width: `${partialStar * 100}%` }}
						>
							<Star
								className={`w-${size} h-${size} fill-primary text-primary`}
							/>
						</div>
					</div>
				)}
				{[...Array(emptyStars)].map((_, i) => (
					<Star
						key={`empty-${i}`}
						className={cn(
							`w-${size} h-${size} text-primary transition-all duration-300`,
							interactive && "cursor-pointer hover:scale-110"
						)}
						onMouseEnter={() =>
							interactive &&
							setHoverRating(fullStars + (partialStar > 0 ? 1 : 0) + i + 1)
						}
						onClick={() =>
							interactive &&
							onChange?.(fullStars + (partialStar > 0 ? 1 : 0) + i + 1)
						}
					/>
				))}
			</div>
			{showNumber && (
				<span className="text-sm text-muted-foreground">
					{rating.toFixed(1)}
				</span>
			)}
			{interactive && (
				<div className="relative" onMouseLeave={() => setHoverRating(null)} />
			)}
		</div>
	);
}
