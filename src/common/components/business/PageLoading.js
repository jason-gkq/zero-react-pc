import React from 'react';

export default (props) => {
	// const { children, ...restProps } = props;
	return (
		<div>
			<div className="ui-error-wrap"></div>
			<div className="screen-center page-loading-wrap">
				<div className="page-loading-icon page-loading-circle">
					<div className="page-loading-icon loading-animation"></div>
				</div>
			</div>
		</div>
	);
};
