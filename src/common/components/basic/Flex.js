import React from 'react';

const defaultStyle = {
    display: 'flex',
    flex: 1
}

export default props => <div {...props} style={{...defaultStyle, ...props.style}}>{props.children}</div>
