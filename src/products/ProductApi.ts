import Axios from 'axios';
import ProductListResponse from './ProductListResponse';
import Product from './Product';

/** Utility class for retrieving products */
export class ProductApi {

	public static baseUrl = 'https://mobile-tha-server.firebaseapp.com';

	public static async getProducts(pageNumber: number, pageSize: number): Promise<ProductListResponse> {
		const url = `${ProductApi.baseUrl}/walmartproducts/${pageNumber}/${pageSize}`;
		const axiosResponse = await Axios.get<ProductListResponse>(url);

		// Change the raw product data into real Product classes
		let productListResponse = axiosResponse.data;
		productListResponse.products = productListResponse.products
			.map(rawData => new Product(rawData));
		return productListResponse;
	}

}