import React from 'react';

export default (props) => {
	const { children, text, ...restProps } = props;
	return (
		<div>
			<div class="loading-wrap flex-center-wrap flex-justify-center">
				<div class="page-loading-icon page-loading-circle">
					<div class="page-loading-icon loading-animation"></div>
				</div>
                {
                    children ? children : <span>{text}</span>
                }	
			</div>
		</div>
	);
};
