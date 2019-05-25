import React from 'react';
import { Layout } from 'antd';
import { ProductList } from './products/product-list/ProductList';
import './App.scss';

const App: React.FC = () => {
	return (
		<Layout>
			<Layout.Header>
				<h1>Sample Store</h1>
			</Layout.Header>
			<Layout.Content>
				<ProductList/>
			</Layout.Content>
		</Layout>
	);
};

export default App;
