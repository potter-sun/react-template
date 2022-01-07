import { API_REQ_FUNCTION } from './types';

export const BASE_APIS = {};

export const COLLECTIONS_ITEMS_APIS = {
  GET_COLLECTIONS_ITEMS_LIST: '/local/api/collections-items',
  GET_CHAINS_LIST: '/local/api/chains',
  GET_SALE_TOKENS_LIST: '/local/api/app/sale-tokens',
};

export const COLLECTIONS_APIS = {
  GET_COLLECTIONS: '/mock/getCollections.json',
};

export const EXPAND_APIS = {
  collections: COLLECTIONS_APIS,
  collectionItems: COLLECTIONS_ITEMS_APIS,
};

export type BASE_REQ_TYPES = {
  [x in keyof typeof BASE_APIS]: API_REQ_FUNCTION;
};

export type EXPAND_REQ_TYPES = {
  [X in keyof typeof EXPAND_APIS]: {
    [K in keyof typeof EXPAND_APIS[X]]: API_REQ_FUNCTION;
  };
};
