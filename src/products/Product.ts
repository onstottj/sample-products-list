import { StringUtil } from '../util/StringUtil';
import { ProductApi } from './ProductApi';

/**
 * Note about 'undefined 'here: I was tempted to use "| null" and initialize these to null, but a lot of Ant Design
 * components seem to want either a string, or 'undefined' to make TypeScript happy.  So I'm going with 'undefined'
 * by default.
 */
export default class Product {

	public productId?: string | undefined;
	public productName: string | undefined;
	/** This can include raw HTML */
	public shortDescription: string | undefined;
	/** This can include raw HTML */
	public longDescription: string | undefined;
	public price: string | undefined;
	public productImage?: string | undefined;
	public reviewRating: number | undefined;
	public reviewCount: number | undefined;
	public inStock: boolean | undefined;

	/** For details on this approach, see https://stackoverflow.com/a/37682352/132374 */
	constructor(rawData?: Partial<Product>) {
		Object.assign(this, rawData);
		this.removeInvalidUTF();
	}

	private removeInvalidUTF(): void {
		this.productName = StringUtil.removeInvalidCharacters(this.productName);
		this.shortDescription = StringUtil.removeInvalidCharacters(this.shortDescription);
		this.longDescription = StringUtil.removeInvalidCharacters(this.longDescription);
	}

	getImageUrl(): string | null {
		return this.productImage ? `${ProductApi.baseUrl}/${this.productImage}` : null;
	}

}