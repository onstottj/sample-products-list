import React, { Component, ReactElement } from 'react';
import { BackTop, Card, List, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import Product from '../Product';
import ProductListResponse from '../ProductListResponse';
import { ProductApi } from '../ProductApi';
import './ProductList.scss';

type ProductListState = {
	loadedProducts: Product[],
	isLoading: boolean,
	hasMore: boolean,
}

/** The list of products uses infinite scrolling; see https://ant.design/components/list/#components-list-demo-infinite-load */
export class ProductList extends Component<any, ProductListState> {

	private static pageSize = 30;

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
		let imageUrl = product.getImageUrl();
		return (
			<List.Item key={product.productId}>
				<Card hoverable className="product-list-card">
					{imageUrl && <img className="product-image" alt="Product" src={imageUrl}/>}
					<div className="product-name">{product.productName}</div>
					{/*	dangerouslySetInnerHTML is used in order to display the description's HTML... we're
					trusting the DB for having safe data to display, but typically we wouldn't do this */}
					<div dangerouslySetInnerHTML={{__html: product.shortDescription || '<i>View details</i>'}}/>
				</Card>
			</List.Item>
		);
	}

	render() {
		return (
			<>
				<div className="demo-infinite-container">
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
							{this.state.isLoading && this.state.hasMore && (
								<div className="demo-loading-container">
									<Spin/>
								</div>
							)}
						</List>
					</InfiniteScroll>
				</div>
				<BackTop/>
			</>
		);
	}

}