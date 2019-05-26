import React from 'react';
import './ResponsiveGrid.scss';

/** I'm using the approach at https://stackoverflow.com/a/55858755/132374 to define props here */
const ResponsiveGrid = (props: { children?: any }) => {
	return (
		<div className="responsive-grid">
			{props.children}
		</div>
	);
};

export default ResponsiveGrid;