import React, { PureComponent, Suspense, Fragment } from 'react';
import { Layout } from 'antd';
import { Switch, Redirect, withRouter } from 'react-router-dom';
import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';
const { Content } = Layout;
class BasePage extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: false,
		};
	}

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};
	render() {
		const { history, match, collapsed, routes, redirects } = this.props;
		console.log(this.props);
		return (
			<Layout>
				<Header collapsed={collapsed} history={history} toggle={this.toggle} />
				<Content>
					<Suspense fallback={<div>Loading...</div>}>
						<Fragment>
							<Switch>
								{routes}
								{redirects}
								<Redirect to={match.url} />
							</Switch>
						</Fragment>
					</Suspense>
				</Content>
				<Footer />
			</Layout>
		);
	}
}

export default BasePage;
