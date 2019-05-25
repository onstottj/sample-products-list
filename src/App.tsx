import React, { useState } from 'react';
import { Layout, Spin } from 'antd';
import { ProductList } from './products/product-list/ProductList';
import './App.scss';

// Functional components are used for simple things; once a component grows enough that methods are useful,
// it is changed into a class (at least that's my approach).
const App = () => {
	const [hasProducts, setHasProducts] = useState(false);
	return (
		<Layout>
			<Layout.Header>
				<h1>Sample Store</h1>
			</Layout.Header>
			<Layout.Content>
				{!hasProducts && <div className="initial-spinner"><Spin/></div>}
				<ProductList isDisplayed={hasProducts} onProductsLoaded={() => setHasProducts(true)}/>
			</Layout.Content>
		</Layout>
	);
};

export default App;
