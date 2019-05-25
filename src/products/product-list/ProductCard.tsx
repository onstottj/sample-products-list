import { Card, Rate, Statistic } from 'antd';
import React, { Component, ReactElement } from 'react';
import Product from '../Product';
import './ProductCard.scss';

type ProductCardProps = {
	product: Product
}

type ProductCardState = {
	isHovered: boolean
}

export default class ProductCard extends Component<ProductCardProps> {

	state: ProductCardState = {
		isHovered: false
	};

	constructor(props: Readonly<ProductCardProps>) {
		super(props);

		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);
		this.getActions = this.getActions.bind(this);
	}

	private onMouseEnter(): void {
		this.setState({isHovered: true});
	}

	private onMouseLeave(): void {
		this.setState({isHovered: false});
	}

	private getActions(): ReactElement[] {
		const product = this.props.product;
		if (this.state.isHovered) {
			return [<div className="view-details-title">View Details</div>];
		} else {
			const hasRating = typeof product.reviewRating === 'number';
			if (!hasRating) {
				return [];
			}
			return [<Rate defaultValue={product.reviewRating} disabled/>];
		}
	}

	render(): ReactElement {
		const product = this.props.product;
		const imageUrl = product.getImageUrl();

		return (
			<Card className="product-list-card"
				  hoverable
				  onMouseEnter={this.onMouseEnter}
				  onMouseLeave={this.onMouseLeave}
				  actions={this.getActions()}>
				<div className="product-name">{product.productName}</div>

				{imageUrl && <img className="product-image" alt="Product" src={imageUrl}/>}

				<Statistic className="product-price" value={product.price}/>

				{/*	dangerouslySetInnerHTML is used in order to display the description's HTML... we're
				trusting the DB for having safe data to display, but typically we wouldn't do this */}
				<div className="product-summary" dangerouslySetInnerHTML={{__html: product.shortDescription || '<i>View details</i>'}}/>

				<div className="card-overlay bottom-white-mask"/>
			</Card>
		);
	}
}