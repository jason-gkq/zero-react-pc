import React, { Component } from 'react';
import { connect } from 'react-redux';

import { globalSelectors } from '../../redux';
import './index.less';
import { TabBar } from '../index';

class FooterErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		// 更新 state 使下一次渲染能够显示降级后的 UI
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// this.setState({
		//   error,
		//   errorInfo,
		// });
		// logErrorToMyService(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return <div>error footer</div>;
		}
		return this.props.children;
	}
}

class Footer extends Component {
	constructor(props) {
		super(props);
		this.state = {
      selectedTab: 'redTab',
      hidden: false,
    };
	}

	render() {
		return (
			<FooterErrorBoundary>
				<div className="footer">
					<TabBar
						unselectedTintColor="#949494"
						tintColor="#33A3F4"
						barTintColor="white"
						hidden={this.state.hidden}
					>
						<TabBar.Item
							title="Life"
							key="Life"
							icon={
								<div
									style={{
										width: '22px',
										height: '22px',
										background:
											'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat',
									}}
								/>
							}
							selectedIcon={
								<div
									style={{
										width: '22px',
										height: '22px',
										background:
											'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat',
									}}
								/>
							}
							selected={this.state.selectedTab === 'blueTab'}
							badge={1}
							onPress={() => {
								this.setState({
									selectedTab: 'blueTab',
								});
							}}
							data-seed="logId"
						>

						</TabBar.Item>
						<TabBar.Item
							icon={
								<div
									style={{
										width: '22px',
										height: '22px',
										background:
											'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat',
									}}
								/>
							}
							selectedIcon={
								<div
									style={{
										width: '22px',
										height: '22px',
										background:
											'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat',
									}}
								/>
							}
							title="Koubei"
							key="Koubei"
							badge={'new'}
							selected={this.state.selectedTab === 'redTab'}
							onPress={() => {
								this.setState({
									selectedTab: 'redTab',
								});
							}}
							data-seed="logId1"
						>
						</TabBar.Item>
						<TabBar.Item
							icon={
								<div
									style={{
										width: '22px',
										height: '22px',
										background:
											'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat',
									}}
								/>
							}
							selectedIcon={
								<div
									style={{
										width: '22px',
										height: '22px',
										background:
											'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat',
									}}
								/>
							}
							title="Friend"
							key="Friend"
							dot
							selected={this.state.selectedTab === 'greenTab'}
							onPress={() => {
								this.setState({
									selectedTab: 'greenTab',
								});
							}}
						>
						</TabBar.Item>
						<TabBar.Item
							icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
							selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
							title="My"
							key="my"
							selected={this.state.selectedTab === 'yellowTab'}
							onPress={() => {
								this.setState({
									selectedTab: 'yellowTab',
								});
							}}
						>
						</TabBar.Item>
					</TabBar>
				</div>
			</FooterErrorBoundary>
		);
	}
}

export default connect(
	(state) => {
		const { currentPage = {} } = globalSelectors.getRoute(state);
		return { currentPage };
	},
	(dispatch) => {
		return {
			dispatch,
		};
	}
)(Footer);
