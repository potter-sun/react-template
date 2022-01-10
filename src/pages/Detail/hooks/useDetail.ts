export interface Owner {
  id: string;
  userName: string;
  address: string;
  profileImage: string;
}

export interface Metadata {
  meta1: string;
  meta2: string;
}

export interface Metadata {
  meta1: string;
  meta2: string;
}

export interface NftProtocol {
  id: string;
  chainId: number;
  symbol: string;
  protocolName: string;
  nftType: string;
  totalSupply: number;
  creator: string;
  isBurnable: boolean;
  issueChainId: number;
  baseUri: string;
  isTokenIdReuse: boolean;
  metadata: Metadata;
}

export interface SaleToken {
  address: string;
  symbol: string;
  decimals: number;
  id: string;
}

export interface Detail {
  id: string;
  nftTokenId: number;
  minter: string;
  owners: Owner;
  uri: string;
  alias: string;
  quantity: number;
  totalQuantity: number;
  tokenHash: string;
  averagePrice: number;
  latestPrice: number;
  latestListingTime: number;
  metadata: Metadata;
  nftProtocol: NftProtocol;
  saleTokens: SaleToken[];
}

export const useDetail = () => {
  return '';
};
