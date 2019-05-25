import React, { Component, ReactElement } from 'react';
import { Avatar, List, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import Product from '../Product';
import ProductListResponse from '../ProductListResponse';
import { ProductApi } from '../ProductApi';
import './ProductList.css';

type ProductListState = {
	loadedProducts: Product[],
	isLoading: boolean,
	hasMore: boolean,
}

/** The list of products uses infinite scrolling; see https://ant.design/components/list/#components-list-demo-infinite-load */
export class ProductList extends Component<any, ProductListState> {

	private static pageSize = 20;

	state: ProductListState = {
		loadedProducts: [],
		isLoading: false,
		hasMore: true,
	};

	private currentPage = 1;

	constructor(props: Readonly<any>) {
		super(props);

		// Workaround for React having trouble remembering 'this'; see https://reactjs.org/docs/handling-events.html
		this.fetchData = this.fetchData.bind(this);
		this.checkForMoreProducts = this.checkForMoreProducts.bind(this);
		this.handleInfiniteOnLoad = this.handleInfiniteOnLoad.bind(this);
	}

	async componentDidMount(): Promise<void> {
		// TODO: add error msg
		const products = await this.fetchData();
		this.setState({loadedProducts: products});
	}

	private async fetchData(): Promise<Product[]> {
		// TODO: add error handler
		const response = await ProductApi.getProducts(this.currentPage, ProductList.pageSize);
		this.checkForMoreProducts(response);
		this.currentPage++;
		return response.products;
	}

	private checkForMoreProducts(response: ProductListResponse): void {
		const previouslyDisplayedProducts = (this.currentPage - 1) * ProductList.pageSize;
		const latestProductShown = previouslyDisplayedProducts + response.products.length;
		// todo
		console.log(`am i at the latest?`, latestProductShown, latestProductShown >= response.totalProducts);
		if (latestProductShown >= response.totalProducts) {
			this.setState({hasMore: false});
		}
	}

	private async handleInfiniteOnLoad(): Promise<any> {
		this.setState({isLoading: true});

		const previousProducts = this.state.loadedProducts;
		const newProducts = await this.fetchData();
		let allProducts = [...previousProducts, ...newProducts];

		this.setState({
			loadedProducts: allProducts,
			isLoading: false,
		});
		return Promise.resolve();	// this promise isn't actively used, but is needed since this is an async function
	}

	private createProductRow(product: Product): ReactElement {
		const summary = product.getSummary();
		return (
			<List.Item key={product.productId}>
				<List.Item.Meta avatar={<Avatar src={product.productImage}/>}
								title={<a href="https://ant.design">{product.productName}</a>}/>
				<div dangerouslySetInnerHTML={{__html: product.productName || ''}}/>
				{/*	dangerouslySetInnerHTML is used here since there are unicode characters to display */}
				{summary && <div dangerouslySetInnerHTML={{__html: summary}}/>}
				{!summary && <div className="empty-description">Click to view details</div>}
			</List.Item>
		);
	}

	render() {
		return (
			<div className="demo-infinite-container">
				<InfiniteScroll initialLoad={false}
								pageStart={0}
								loadMore={this.handleInfiniteOnLoad}
								hasMore={!this.state.isLoading && this.state.hasMore}
								useWindow={true}>
					<List dataSource={this.state.loadedProducts}
						  itemLayout="vertical"
						  renderItem={product => this.createProductRow(product)}>
						{this.state.isLoading && this.state.hasMore && (
							<div className="demo-loading-container">
								<Spin/>
							</div>
						)}
					</List>
				</InfiniteScroll>
			</div>
		);
	}

}