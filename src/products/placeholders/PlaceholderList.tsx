import * as React from 'react';
import PlaceholderCard from './PlaceholderCard';
import ResponsiveGrid from '../../shared-components/ResponsiveGrid';

const PlaceholderList = () => {
	// Add a large amount of dummy, 'loading' cards.  There can be a max of 6 cards across, and we'll add 6 rows.
	const cardCount = 6 * 6;

	const cardKeys: number[] = [];
	for (let i = 1; i <= cardCount; i++) {
		cardKeys.push(i);
	}

	return (
		<div className="product-list">
			<div className="infinite-container">
				<ResponsiveGrid>
					{cardKeys.map(key => (
						<PlaceholderCard key={key}/>
					))}
				</ResponsiveGrid>
			</div>
		</div>
	);
};

export default PlaceholderList;