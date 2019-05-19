import { Product } from '../products/Product';
import Axios, { AxiosPromise } from 'axios';

/** Utility class for retrieving products */
export class ProductApi {

	private static baseUrl = 'https://mobile-tha-server.firebaseapp.com';

	public static getProducts(pageNumber: number, pageSize: number): AxiosPromise<Product[]> {
		const url = `${ProductApi.baseUrl}/walmartproducts/${pageNumber}/${pageSize}`;
		return Axios.get(url);
	}

}