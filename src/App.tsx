import React from 'react';
import { ProductList } from './products/product-list/ProductList';
import './App.scss';

const App: React.FC = () => {
	return (
		<div>
			<h1>Sample Store</h1>
			<ProductList/>
		</div>
	);
};

export default App;
