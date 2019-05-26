import { Card, Rate, Statistic } from 'antd';
import React, { Component, ReactElement } from 'react';
import Product from '../Product';
import './ProductCard.scss';

// Define the handler once (it is used in several 'props' objects)
export type OnProductSelected = {
	onProductSelected: (product: Product | null) => void,
}

type ProductCardProps = {
	product: Product,
} & OnProductSelected

export default class ProductCard extends Component<ProductCardProps> {

	constructor(props: Readonly<ProductCardProps>) {
		super(props);

		this.getActions = this.getActions.bind(this);
		this.viewDetails = this.viewDetails.bind(this);
	}

	private getActions(): ReactElement[] {
		if (typeof this.props.product.reviewRating === 'number') {
			return [this.createReviewsElement()];
		}
		return [];
	}

	private viewDetails(): void {
		this.props.onProductSelected(this.props.product);
	}

	private createReviewsElement(): ReactElement {
		const product = this.props.product;
		return (
			<div className="product-reviews">
				<Rate value={product.reviewRating} allowHalf={true} disabled/>
				<div>{product.reviewCount} reviews</div>
			</div>
		);
	}

	render(): ReactElement {
		const product = this.props.product;
		const imageUrl = product.getImageUrl();
		return (
			<Card className="product-card" actions={this.getActions()} onClick={this.viewDetails}>
				<div className="product-card-content">
					<div className="product-name">{product.productName}</div>

					{/* Typically we'd need thumbnail versions of the images */}
					{imageUrl && <div className="product-image"><img alt="Product" src={imageUrl}/></div>}

					<Statistic className="product-price" value={product.price}/>

					{/*	dangerouslySetInnerHTML is used in order to display the description's HTML... we're
						trusting the DB for having safe data to display, but typically we wouldn't do this */}
					<div className="product-summary" dangerouslySetInnerHTML={{__html: product.shortDescription || '<i>View details</i>'}}/>

					{/* Fade-out text at the bottom */}
					<div className="card-overlay bottom-white-mask"/>
				</div>
			</Card>
		);
	}
}