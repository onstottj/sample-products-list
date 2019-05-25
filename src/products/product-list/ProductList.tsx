import React, { Component, ReactElement } from 'react';
import { BackTop, List, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import Product from '../Product';
import ProductListResponse from '../ProductListResponse';
import { ProductApi } from '../ProductApi';
import ProductCard from './ProductCard';
import './ProductList.scss';

type ProductListProps = {
	isDisplayed: boolean,
	onProductsLoaded: () => void,
};

type ProductListState = {
	loadedProducts: Product[],
	isLoading: boolean,
	hasMore: boolean,
}

/** The list of products uses infinite scrolling; see https://ant.design/components/list/#components-list-demo-infinite-load */
export class ProductList extends Component<ProductListProps, ProductListState> {

	private static pageSize = 24;	// the max we can load is 30; this is 4 rows of 6 products (we show a max of 6 across)

	state: ProductListState = {
		loadedProducts: [],
		isLoading: false,
		hasMore: true,
	};

	private currentPage = 1;

	constructor(props: Readonly<ProductListProps>) {
		super(props);

		// Workaround for React having trouble remembering 'this'; see https://reactjs.org/docs/handling-events.html
		this.fetchData = this.fetchData.bind(this);
		this.checkForMoreProducts = this.checkForMoreProducts.bind(this);
		this.handleInfiniteOnLoad = this.handleInfiniteOnLoad.bind(this);
	}

	async componentDidMount(): Promise<void> {
		// TODO: add error msg
		const products = await this.fetchData();
		this.onProductsLoaded(products);
	}

	private async fetchData(): Promise<Product[]> {
		// TODO: add error handler
		const response = await ProductApi.getProducts(this.currentPage, ProductList.pageSize);
		this.checkForMoreProducts(response);
		this.currentPage++;
		return response.products;
	}

	private onProductsLoaded(products: Product[]): void {
		this.setState({
			loadedProducts: products,
			isLoading: false,
		});
		this.props.onProductsLoaded();	// notify the parent that products have been loaded (or if there aren't any, at least we tried)
	}

	private checkForMoreProducts(response: ProductListResponse): void {
		const previouslyDisplayedProducts = (this.currentPage - 1) * ProductList.pageSize;
		const latestProductShown = previouslyDisplayedProducts + response.products.length;
		if (latestProductShown >= response.totalProducts) {
			this.setState({hasMore: false});
		}
	}

	private async handleInfiniteOnLoad(): Promise<any> {
		this.setState({isLoading: true});

		const previousProducts = this.state.loadedProducts;
		const newProducts = await this.fetchData();
		let allProducts = [...previousProducts, ...newProducts];

		this.onProductsLoaded(allProducts);
		return Promise.resolve();	// this promise isn't actively used, but is needed since this is an async function
	}

	private createProductRow(product: Product): ReactElement {
		return (
			<List.Item key={product.productId}>
				<ProductCard product={product}/>
			</List.Item>
		);
	}

	private createLoadingIndicator(): ReactElement {
		return (
			<div className="loading-more-indicator">
				<Spin/>
			</div>
		);
	}

	render() {
		const showLoadingIndicator = this.state.isLoading && this.state.hasMore;
		const classes = `product-list ${!this.props.isDisplayed ? 'hidden' : ''}`;
		return (
			<div className={classes}>
				<div className="infinite-container">
					<InfiniteScroll initialLoad={false}
									pageStart={0}
									loadMore={this.handleInfiniteOnLoad}
									hasMore={!this.state.isLoading && this.state.hasMore}
									useWindow={true}>
						<List dataSource={this.state.loadedProducts}
							  itemLayout="vertical"
							  grid={{
								  gutter: 16,
								  xs: 1,
								  sm: 6,
								  md: 6,
								  lg: 6,
								  xl: 6,
								  xxl: 6,
							  }}
							  renderItem={product => this.createProductRow(product)}>
							{showLoadingIndicator && this.createLoadingIndicator()}
						</List>
					</InfiniteScroll>
				</div>
				<BackTop className="back-to-top-indicator"/>
			</div>
		);
	}

}