export interface Product {
	name: string;
	image: string;
	href: string;
	items?: string[];
}

export interface Carousel {
	image: string;
	url: string;
	title: string;
	buttonCaption: string;
}

export interface HomePageData {
	categories: string[];
	newArrivals: Product[];
	featureds: Product[];
	bestSellers: Product[];
	carousels: Carousel[];
}
