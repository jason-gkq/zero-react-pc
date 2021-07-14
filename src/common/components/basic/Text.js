import React from 'react';

const defaultStyle = {
    color: '#333',
    fontWeight: '300',
    fontFamily: 'PingFang-SC' // 安卓：fontFamily: 'Vani'
}

export default props => <span style={{...defaultStyle, ...props.style}} {...props}>{props.children}</span>
