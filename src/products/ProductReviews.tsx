import React from 'react';
import { Rate } from 'antd';
import Product from './Product';
import './ProductReviews.scss';

type ProductReviewsProps = {
	product: Product
}

const ProductReviews = (props: ProductReviewsProps) => {
	const product = props.product;
	const reviewCount = product.reviewCount;
	const reviewText = reviewCount && `${reviewCount} review${reviewCount !== 1 ? 's' : ''}`;
	return (
		<div className="product-reviews">
			<Rate value={product.reviewRating} allowHalf={true} disabled/>
			<div>{reviewText}</div>
		</div>
	);
};

export default ProductReviews;