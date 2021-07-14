import React, { PureComponent } from "react";
import { Layout } from "../../components";

export default class AppPage extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return <Layout {...this.props} />;
  }
}

{
  /* <Layout>
<BrowserRouter basename='/lcbtest'>
<Router history={$history}>
  <Switch>{$routes}</Switch>
</Router>
</BrowserRouter>
</Layout> */
}
