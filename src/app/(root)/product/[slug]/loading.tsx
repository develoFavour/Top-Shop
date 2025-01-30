import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailsLoading() {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="grid grid-cols-1 md:grid-cols-5 gap-8">
				<div className="col-span-2">
					<Skeleton className="aspect-square w-full rounded-lg" />
				</div>

				<div className="col-span-2 space-y-4">
					<Skeleton className="h-4 w-20" />
					<Skeleton className="h-8 w-full" />
					<Skeleton className="h-4 w-32" />
					<Skeleton className="h-px w-full" />
					<Skeleton className="h-20 w-full" />
					<Skeleton className="h-40 w-full" />
				</div>

				<div className="col-span-1">
					<Skeleton className="h-[300px] w-full rounded-lg" />
				</div>
			</div>
		</div>
	);
}
