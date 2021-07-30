import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from 'pages/Main';
import Product from 'pages/Product';
import RecentList from 'pages/RecentList';
import { fetchApiData } from 'utils/api/config';

export default class App extends React.Component {
  state = {
    items: [],
  };

  componentDidMount() {
    // const getData = async () => {
    //   const items = await fetchApiData();
    //   this.setState({ items });
    // };
    fetchApiData().then(items => this.setState({ items }));
  }

  render() {
    const { items } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            component={props => <Main {...props} items={items} />}
          />
          <Route
            exact
            path="/product"
            component={props => <Product {...props} items={items} />}
          />
          <Route exact path="/recentList" component={RecentList} />
        </Switch>
      </BrowserRouter>
    );
  }
}
