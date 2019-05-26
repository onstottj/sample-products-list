import * as React from 'react';
import { Card, Skeleton } from 'antd';
import '../product-list/ProductCard.scss';

const PlaceholderCard = () => {
	return (
		<Card className="product-card placeholder-card">
			<Skeleton loading={true}
					  avatar={{size: 'large', shape: 'square'}}
					  paragraph={{rows: 5}}
					  active/>
		</Card>
	);
};

export default PlaceholderCard;