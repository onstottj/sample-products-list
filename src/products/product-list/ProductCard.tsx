import { Card, Icon, Statistic } from 'antd';
import React, { Component, ReactElement } from 'react';
import Product from '../Product';
import ProductReviews from '../../shared-components/ProductReviews';
import './ProductCard.scss';

// Define the handler once (it is used in several 'props' objects)
export type OnProductSelected = {
	onProductSelected: (product: Product | null) => void,
}

type ProductCardProps = {
	product: Product,
} & OnProductSelected

type ProductCardState = {
	isHovered: boolean
}

export default class ProductCard extends Component<ProductCardProps, ProductCardState> {

	state: ProductCardState = {
		isHovered: false
	};

	constructor(props: Readonly<ProductCardProps>) {
		super(props);

		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);
		this.getActions = this.getActions.bind(this);
		this.viewDetails = this.viewDetails.bind(this);
	}

	private onMouseEnter(): void {
		this.setState({isHovered: true});
	}

	private onMouseLeave(): void {
		this.setState({isHovered: false});
	}

	private getActions(): ReactElement[] {
		const product = this.props.product;
		if (product.reviewRating) {
			const actions: ReactElement[] = [<ProductReviews product={product}/>];
			if (this.state.isHovered) {
				actions.push(<Icon className="add-to-cart-icon" type="shopping-cart"/>);
			}
			return actions;
		}
		return [];
	}

	private viewDetails(): void {
		this.props.onProductSelected(this.props.product);
	}

	render(): ReactElement {
		const product = this.props.product;
		const imageUrl = product.getImageUrl();
		return (
			<Card className="product-card"
				  actions={this.getActions()}
				  onMouseEnter={this.onMouseEnter}
				  onMouseLeave={this.onMouseLeave}
				  onClick={this.viewDetails}>
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