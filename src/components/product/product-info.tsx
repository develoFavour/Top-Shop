"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductInfoProps {
	description: string;
}

export default function ProductInfo({ description }: ProductInfoProps) {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div className="space-y-4">
			<div className="flex justify-between items-center">
				<h3 className="text-lg font-semibold">Product Description</h3>
				<Button
					variant="ghost"
					size="sm"
					onClick={() => setIsExpanded(!isExpanded)}
					className="text-gray-500"
				>
					<motion.div
						animate={{ rotate: isExpanded ? 180 : 0 }}
						transition={{ duration: 0.2 }}
					>
						<ChevronDown className="h-5 w-5" />
					</motion.div>
				</Button>
			</div>

			<AnimatePresence initial={false}>
				<motion.div
					initial={{ height: 0, opacity: 0 }}
					animate={{
						height: isExpanded ? "auto" : "100px",
						opacity: 1,
					}}
					exit={{ height: 0, opacity: 0 }}
					transition={{ duration: 0.3 }}
					className="overflow-hidden"
				>
					<p className="text-gray-600 leading-relaxed">{description}</p>
				</motion.div>
			</AnimatePresence>

			{!isExpanded && description.length > 200 && (
				<div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent" />
			)}
		</div>
	);
}
