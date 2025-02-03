import { create } from "zustand";
import { persist } from "zustand/middleware";

type Product = { id: string; category: string };

interface BrowsingHistoryState {
	products: Product[];
	addItem: (product: Product) => void;
	clear: () => void;
}

export const useBrowsingHistory = create<BrowsingHistoryState>()(
	persist(
		(set) => ({
			products: [],
			addItem: (product) => {
				set((state) => {
					const updatedProducts = state.products.filter(
						(p) => p.id !== product.id
					);
					updatedProducts.unshift(product);
					return { products: updatedProducts.slice(0, 10) };
				});
			},
			clear: () => set({ products: [] }),
		}),
		{
			name: "browsingHistoryStore",
		}
	)
);

export default useBrowsingHistory;
