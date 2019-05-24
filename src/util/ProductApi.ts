import { ProductListResponse } from '../products/Product';
import Axios from 'axios';

/** Utility class for retrieving products */
export class ProductApi {

	private static baseUrl = 'https://mobile-tha-server.firebaseapp.com';

	public static async getProducts(pageNumber: number, pageSize: number): Promise<ProductListResponse> {
		const url = `${ProductApi.baseUrl}/walmartproducts/${pageNumber}/${pageSize}`;
		const axiosResponse = await Axios.get(url);
		return axiosResponse.data;
	}

}