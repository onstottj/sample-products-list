import * as React from 'react';
import { Button, Card, Modal, Statistic } from 'antd';
import Product from '../Product';
import ProductReviews from '../../shared-components/ProductReviews';
import './ProductDetailsDialog.scss';

type ProductDetailsDialogProps = {
	visible: boolean,
	product: Product | null,
	/**
	 * When the dialog is closed we don't want to null out the product, because there is a close animation and
	 * the dialog would look strange.  So we'll leave the product intact and just set the visibility.
	 */
	closeTriggered: () => void
};

const ProductDetailsDialog = (props: ProductDetailsDialogProps) => {
	// Product will be null on initial load
	const product = props.product;
	if (!product) {
		return (<></>);
	}

	const productImage = product.getImageUrl();

	const onCloseTriggered = () => props.closeTriggered();

	return (
		<Modal title="Product Details"
			   className="product-details-modal"
			   visible={props.visible}
			   centered
			   width="80%"
			   maskClosable={true}
			   onCancel={onCloseTriggered}
			   footer={[
				   <Button key="addToCartButton" disabled>Add to Cart</Button>,
				   <Button key="closeButton" type="primary" onClick={onCloseTriggered}>Close</Button>
			   ]}>

			<h2>{product.productName}</h2>

			{/* Full-size image */}
			{productImage && (
				<div className="dialog-image">
					<img src={productImage} alt={product.productName}/>
				</div>
			)}

			{/* Price, availability, & reviews */}
			<div className="dialog-price-availability-reviews">
				<div className="small-column">
					<Statistic value={product.price}/>

					<div className="dialog-stock">
						{product.inStock && <div className="dialog-in-stock">In stock</div>}
						{!product.inStock && <div className="dialog-out-of-stock">Out of stock</div>}
					</div>
				</div>

				<ProductReviews product={product}/>
			</div>

			<div className="dialog-descriptions">
				{/* Highlights card */}
				{product.shortDescription && (
					<Card title="Highlights" className="dialog-highlights" type="inner">
						<div dangerouslySetInnerHTML={{__html: product.shortDescription}}/>
					</Card>
				)}

				{/*	Full description */}
				{product.longDescription && (
					<div className="dialog-long-description" dangerouslySetInnerHTML={{__html: product.longDescription}}/>
				)}
			</div>

		</Modal>
	);
};

export default ProductDetailsDialog;