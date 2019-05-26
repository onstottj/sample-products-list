import React from 'react';
import { Rate } from 'antd';
import Product from './Product';
import './ProductReviews.scss';

type ProductReviewsProps = {
	product: Product
}

const ProductReviews = (props: ProductReviewsProps) => {
	const product = props.product;
	return (
		<div className="product-reviews">
			<Rate value={product.reviewRating} allowHalf={true} disabled/>
			<div>{product.reviewCount} reviews</div>
		</div>
	);
};

export default ProductReviews;