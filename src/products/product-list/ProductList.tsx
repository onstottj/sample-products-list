import React, { Component } from 'react';
import { BackTop, Empty, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import Product from '../Product';
import ProductListResponse from '../ProductListResponse';
import { ProductApi } from '../ProductApi';
import ProductCard, { OnProductSelected } from './ProductCard';
import './ProductList.scss';

type ProductListProps = {
	isDisplayed: boolean,
	onProductsLoaded: () => void,
} & OnProductSelected;

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

	render() {
		const showLoadingIndicator = this.state.isLoading && this.state.hasMore;
		// This list component is in the DOM before data is loaded, so use 'display: none' as needed
		const classes = `product-list ${!this.props.isDisplayed ? 'hidden' : ''}`;
		return (
			<div className={classes}>
				<div className="infinite-container">
					<InfiniteScroll initialLoad={false}
									pageStart={0}
									loadMore={this.handleInfiniteOnLoad}
									hasMore={!this.state.isLoading && this.state.hasMore}
									useWindow={false}>
						<div className="product-grid">
							{this.state.loadedProducts.length === 0 && <Empty description="No Products Available"/>}
							{this.state.loadedProducts.map(product => (
								<ProductCard key={product.productId} product={product} onProductSelected={this.props.onProductSelected}/>
							))}
							{showLoadingIndicator &&
							<Spin className="loading-more-indicator" tip="Loading more..." size="large"/>}
						</div>
					</InfiniteScroll>
				</div>
				<BackTop/>
			</div>
		);
	}

}