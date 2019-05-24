import Product from './Product';

export default interface ProductListResponse {
	products: Product[],
	totalProducts: number,
	pageNumber: number,
	pageSize: number,
	statusCode: number
}