import React from 'react';
import { ProductList } from './products/ProductList';
import './App.css';

const App: React.FC = () => {
	return (
		<div>
			<h1>Sample Store</h1>
			<ProductList/>
		</div>
	);
};

export default App;
