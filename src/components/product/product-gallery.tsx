"use client";

import { useState } from "react";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export default function ProductGallery({ images }: { images: string[] }) {
	const [selectedImage, setSelectedImage] = useState(0);

	return (
		<div className="w-full max-w-full overflow-hidden">
			{/* Main Image */}
			<div className="w-full mb-4">
				<Zoom>
					<div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
						<Image
							src={images[selectedImage] || "/placeholder.svg"}
							alt="Product image"
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							className="object-contain"
							priority
						/>
					</div>
				</Zoom>
			</div>

			{/* Thumbnails */}
			<div className="w-full overflow-x-auto pb-4">
				<div className="flex gap-2 min-w-min">
					{images.map((image, index) => (
						<button
							key={index}
							onClick={() => setSelectedImage(index)}
							onMouseOver={() => setSelectedImage(index)}
							className={`flex-shrink-0 relative w-16 h-16 rounded-lg overflow-hidden ${
								selectedImage === index
									? "ring-2 ring-primary"
									: "ring-1 ring-gray-200"
							}`}
						>
							<Image
								src={image || "/placeholder.svg"}
								alt={`Product thumbnail ${index + 1}`}
								fill
								sizes="64px"
								className="object-cover"
							/>
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
