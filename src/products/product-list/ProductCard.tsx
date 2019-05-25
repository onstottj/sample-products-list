import { Card } from 'antd';
import React from 'react';
import Product from '../Product';
import './ProductCard.scss';

type ProductCardProps = {
	product: Product
}

const ProductCard = (props: ProductCardProps) => {
	const product = props.product;
	const imageUrl = product.getImageUrl();
	return (
		<Card hoverable className="product-list-card">
			{imageUrl && <img className="product-image" alt="Product" src={imageUrl}/>}

			<div className="product-name">{product.productName}</div>

			{/*	dangerouslySetInnerHTML is used in order to display the description's HTML... we're
					trusting the DB for having safe data to display, but typically we wouldn't do this */}
			<div dangerouslySetInnerHTML={{__html: product.shortDescription || '<i>View details</i>'}}/>

			<div className="card-overlay view-details-overlay">
				View Details
			</div>
			<div className="card-overlay bottom-white-mask"/>
		</Card>
	);
};

export default ProductCard;