import React, { useState } from 'react';
import { Icon, Layout } from 'antd';
import { ProductList } from './products/product-list/ProductList';
import PlaceholderList from './products/placeholders/PlaceholderList';
import ProductDetailsDialog from './products/product-details-dialog/ProductDetailsDialog';
import Product from './products/Product';
import './App.scss';

// Functional components are used for simple things; once a component grows enough that methods are useful,
// it is changed into a class (at least that's my approach).
const App = () => {
	const [hasProducts, setHasProducts] = useState<boolean>(false);

	// State and handling of events for the Product Details Dialog
	const [isProductDialogVisible, setProductDialogVisible] = useState<boolean>(false);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	const onProductSelected = (product: Product | null) => {
		setSelectedProduct(product);
		setProductDialogVisible(true);
	};
	const onDialogCloseTriggered = () => {
		setProductDialogVisible(false);
	};

	return (
		<>
			<Layout>
				<Layout.Header>
					<h1>Sample Store</h1>
					<Icon type="shopping-cart"/>
				</Layout.Header>
				<Layout.Content>
					{!hasProducts && <PlaceholderList/>}
					<ProductList isDisplayed={hasProducts}
								 onProductsLoaded={() => setHasProducts(true)}
								 onProductSelected={onProductSelected}/>
				</Layout.Content>
			</Layout>

			<ProductDetailsDialog visible={isProductDialogVisible}
								  product={selectedProduct}
								  closeTriggered={onDialogCloseTriggered}/>
		</>
	);
};

export default App;
