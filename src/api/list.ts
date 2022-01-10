import { API_REQ_FUNCTION } from './types';

export const BASE_APIS = {};

export const COLLECTIONS_APIS = {
  GET_NFT_TYPES: '/mock/nft-types.json',
  GET_COLLECTIONS: '/mock/getCollections.json',
};

export const NFT_APIS = {
  GET_NFT_INFO: '/mock/nft-infos/by-token-hash',
};

export const EXPAND_APIS = {
  collections: COLLECTIONS_APIS,
  nft: NFT_APIS,
};

export type BASE_REQ_TYPES = {
  [x in keyof typeof BASE_APIS]: API_REQ_FUNCTION;
};

export type EXPAND_REQ_TYPES = {
  [X in keyof typeof EXPAND_APIS]: {
    [K in keyof typeof EXPAND_APIS[X]]: API_REQ_FUNCTION;
  };
};
