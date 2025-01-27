"use client";

import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { APP_NAME } from "@/lib/constant";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const categories = ["men", "women", "kids", "accessories"];

export default function Search() {
	const formRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Animate form elements
			gsap.from(formRef.current, {
				width: "90%",
				opacity: 0,
				duration: 0.6,
				ease: "power2.out",
			});
		});

		return () => ctx.revert();
	}, []);

	return (
		<form
			ref={formRef}
			action="/search"
			method="GET"
			className="flex items-stretch h-12 rounded-2xl overflow-hidden shadow-lg shadow-primary/5"
		>
			<Select name="category">
				<SelectTrigger className="w-auto min-w-[120px] h-full border-0 rounded-none bg-white/50 backdrop-blur-lg">
					<SelectValue placeholder="All" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="all">All</SelectItem>
					{categories.map((category) => (
						<SelectItem key={category} value={category}>
							{category.charAt(0).toUpperCase() + category.slice(1)}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Input
				className="flex-1 border-0 rounded-none h-full bg-white/50 backdrop-blur-lg focus-visible:ring-0"
				placeholder={`Search ${APP_NAME}`}
				name="q"
				type="search"
			/>
			<button
				type="submit"
				className="px-6 bg-primary hover:bg-primary/90 text-white transition-colors duration-200"
			>
				<SearchIcon className="w-5 h-5" />
			</button>
		</form>
	);
}
