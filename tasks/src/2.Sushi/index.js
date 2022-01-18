import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import { createStore, applyMiddleware } from 'redux';
import 'regenerator-runtime/runtime';
import './styles.css';
import Page from './constants/Page';
import Status from './constants/Status';
import ErrorBoundary from './components/ErrorBoundary';
import Navigation from './containers/Navigation';
import Pages from './containers/Pages';
import { rootReducer } from './reducers';
import products from './api/products';
import Api from './api';
import { Provider } from 'react-redux'; 
import * as actionTypes from './actionTypes';
import logger from 'redux-logger';
import { navigateTo, loadProductsSuccess, loadProductsRequest } from './actionCreators';

const productsAllIds = products.map(p => p.id);
const productsById = products.reduce(
  (result, product) => ({ ...result, [product.id]: product }),
  {}
);


const customMiddleWare = ({ getState, dispatch }) => next => action => {
  // console.log(action.type);
  if (action.type ===  actionTypes.NAVIGATE_TO_PAGE){
    const currPage = getState().page;
    // console.log(action);
    if (currPage === Page.menu){
      return next({
        type: action.type,
        page: Page.cart
      });
    }
  }
  return next(action);
};

const api = new Api({ baseUrl: 'http://sampleserviceurl?foo=bar' });

const store = createStore(rootReducer, applyMiddleware(customMiddleWare, logger));

class App extends React.Component {
  componentDidMount(){
    store.dispatch(loadProductsRequest());
    api.fetchProducts().then(products => {
      store.dispatch(loadProductsSuccess(products));
    });
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <ErrorBoundary>
            <header className="header">
              <h1>Sushi &amp; Rolls</h1>
              <Navigation />
            </header>
            <Pages />
          </ErrorBoundary>
        </div>
      </Provider>
    );
  }
}

App.propTypes = {};

ReactDom.render(<App />, document.getElementById('app'));
