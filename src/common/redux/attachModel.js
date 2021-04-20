import React, { PureComponent } from 'react';
// import Config from './PageConfig';
import { connect } from 'react-redux';
// import { action as globalAction } from '../Redux';

export default (model) => (Component) => {
	// 实例级别model的情况
	class TargetComponent extends Component {
		constructor(props) {
			super(props);
			const model = this.model;
			if (!model) {
				return;
			}
			model.runSaga();
			const { dispatch } = this.props;
			if (model.initialize) {
				dispatch(model.action.initState());
			}
			this.props.$model = model;
		}

		componentWillMount() {
			if (super.componentWillMount) {
				super.componentWillMount();
			}
			// const { rootTag, dispatch } = this.props;
			// if (!TargetComponent.getConfig().notRegister){
			//     if (!Config.routes){
			//         Config.routes = {};
			//     }
			//     Config.routes[rootTag] = TargetComponent.getConfig().id;
			//     // 路由变化全局通知
			//     dispatch(globalAction.currentPage({rootTag: rootTag, pageId: TargetComponent.getConfig().id}));
			// }
		}

		componentDidMount() {
			if (super.componentDidMount) {
				super.componentDidMount();
			}
			const model = this.model;
			if (!model) {
				return;
			}
			const { dispatch } = this.props;
			if (model.action.didMount) {
				dispatch(model.action.didMount(this.props));
			}
		}

		componentWillUnmount() {
			if (super.componentWillUnmount) {
				super.componentWillUnmount();
			}
			// const { rootTag, dispatch } = this.props;

			// if (!TargetComponent.getConfig().notRegister) {
			//     if (Config.routes && Object.keys(Config.routes).includes(rootTag && rootTag.toString())) {
			//         delete Config.routes[rootTag && rootTag.toString()];
			//     }
			//     const routeKeys = Object.keys(Config.routes);
			//     // 路由变化全局通知
			//     dispatch(globalAction.currentPage({
			//         rootTag: [routeKeys[routeKeys.length - 1]],
			//         pageId: Config.routes[routeKeys[routeKeys.length - 1]]
			//     }));
			// }

			const model = this.model;
			if (!model) {
				return;
			}
			if (model.cache === false) {
				model.removeReducer();
			}
			if (model.action.willUnmount) {
				dispatch(
					model.action.willUnmount({
						done: () => {
							model.cancelSaga();
						},
					})
				);
			} else {
				model.cancelSaga();
			}
		}
	}

	if (!model) {
		return connect()(TargetComponent);
	}

	@connect((state) => ({
		$pageStatus: model.selector.getState(state).pageStatus,
	}))
	class ComponentWithModel extends PureComponent {
		constructor(props) {
			super(props);
			model.runSaga();
			const { dispatch } = this.props;
			if (model.initialize) {
				dispatch(model.action.initState());
			}
		}

		componentDidMount() {
			// 使用setTimeout解决跳转页面短暂空白问题
			setTimeout(() => {
				const { dispatch } = this.props;
				if (model.action.didMount) {
					dispatch(model.action.didMount(this.props));
				}
			}, 0);
		}
		componentWillUnmount() {
			const { dispatch, rootTag } = this.props;
			// const pageId = TargetComponent.getConfig().id;
			// if (Config.routes && Config.routes[rootTag]) {
			// 	delete Config.routes[rootTag];
			// }
			if (model.action.willUnmount) {
				dispatch(
					model.action.willUnmount({
						done: () => {
							if (!Object.values(Config.routes).includes(pageId)) {
								model.cancelSaga();
							}
						},
					})
				);
			} else {
				// if (!Object.values(Config.routes).includes(pageId)) {
				// 	model.cancelSaga();
				// }
			}
		}
		render() {
			return <TargetComponent {...this.props} $model={model} />;
		}
	}

	return ComponentWithModel;
};
