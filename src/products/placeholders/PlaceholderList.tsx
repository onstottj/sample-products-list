import * as React from 'react';
import PlaceholderCard from './PlaceholderCard';

const PlaceholderList = () => {
	// Add a large amount of dummy, 'loading' cards.  There can be a max of 6 cards across, and we'll add 6 rows.
	const cardCount = 6 * 6;
	return (
		<div className="product-list">
			<div className="product-grid">
				{/* An interesting approach from https://stackoverflow.com/a/39232049/132374 */}
				{Array.from({length: cardCount}).map(() => (
					<PlaceholderCard/>
				))}
			</div>
		</div>
	);
};

export default PlaceholderList;