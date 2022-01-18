import * as actionTypes from '../actionTypes';

const loadProductsRequest = () => ({
  type: actionTypes.LOAD_PRODUCTS_REQUEST
});

const loadProductsSuccess = (products) => ({
  type: actionTypes.LOAD_PRODUCTS_SUCCESS,
  products
});

const navigateTo = page => ({
  type: actionTypes.NAVIGATE_TO_PAGE,
  page
});

export {
  loadProductsRequest,
  loadProductsSuccess,
  navigateTo
}