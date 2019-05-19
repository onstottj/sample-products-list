export interface ProductListResponse {
	products: Product[],
	totalProducts: number,
	pageNumber: number,
	pageSize: number,
	statusCode: number
}

export default interface Product {
	productId: string,
	productName: string,
	/** Can include HTML */
	shortDescription: string,
	longDescription: string,
	price: string,
	productImage: string,
	reviewRating: number,
	reviewCount: 1,
	inStock: boolean
}