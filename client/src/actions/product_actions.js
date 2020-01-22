import axios from 'axios';
import {
  PRODUCT_SERVER
} from '../components/utils';
import {
  GET_PRODUCT_BY_ARRIVAL,
  GET_PRODUCT_BY_SELL,
  GET_BRANDS,
  GET_WOODS,
  GET_PRODUCTS_TO_SHOP,
  GET_PRODUCT_BY_ID,
  ADD_PRODUCT,
  CLEAR_PRODUCT,
  ADD_BRAND,
  ADD_WOOD,
  CLEAR_PRODUCT_DETAIL
} from './types';

export const clearProduct = () => {
  return {
    type: CLEAR_PRODUCT,
    payload: ''
  }
}

export const addProduct = (dataToSubmit) => {
  const request = axios
    .post(`${PRODUCT_SERVER}/article`, dataToSubmit)
    .then(response => response.data);

  return {
    type: ADD_PRODUCT,
    payload: request
  };
};

export const getProductsForShop = (
  skip,
  limit,
  filters = [],
  previousState = []
) => {
  const data = {
    skip,
    limit,
    filters
  };
  const request = axios.post(`${PRODUCT_SERVER}/shop`, data).then(res => {
    const newState = [...previousState, ...res.data.articles];

    return {
      size: res.data.size,
      articles: newState
    };
  });
  return {
    type: GET_PRODUCTS_TO_SHOP,
    payload: request
  };
};

export const getProductsByArrival = () => {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
    .then(response => response.data);

  return {
    type: GET_PRODUCT_BY_ARRIVAL,
    payload: request
  };
};

export const getProductsBySell = () => {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
    .then(res => res.data);

  return {
    type: GET_PRODUCT_BY_SELL,
    payload: request
  };
};

export const clearProductDetail = () => {
  return {
    type: CLEAR_PRODUCT_DETAIL,
    payload: ''
  }
}

export const getProductsById = (id) => {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles_by_id?id=${id}&type=single`)
    .then(res => res.data[0]);

  return {
    type: GET_PRODUCT_BY_ID,
    payload: request
  };
};

export const getBrands = () => {
  const request = axios.get(`${PRODUCT_SERVER}/brands`).then(res => res.data);

  return {
    type: GET_BRANDS,
    payload: request
  };
};

export const getWoods = () => {
  const request = axios.get(`${PRODUCT_SERVER}/woods`).then(res => res.data);

  return {
    type: GET_WOODS,
    payload: request
  };
};

export const addBrand = (brand, existingBrands) => {
  const request = axios.post(`${PRODUCT_SERVER}/brand`, brand).then(res => {

    let brands = [
      ...existingBrands,
      res.data.brand
    ]
    return {
      success: res.data.success,
      brands
    }

  })

  return {
    type: ADD_BRAND,
    payload: request
  };
}
export const addWood = (wood, existingWoods) => {
  const request = axios.post(`${PRODUCT_SERVER}/wood`, wood).then(res => {

    let woods = [
      ...existingWoods,
      res.data.wood
    ]
    return {
      success: res.data.success,
      woods
    }

  })

  return {
    type: ADD_WOOD,
    payload: request
  };
}