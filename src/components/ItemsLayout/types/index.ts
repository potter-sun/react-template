export enum FilterType {
  Single,
  Multiple,
  Range,
}

export type SourceItem = {
  value: string;
  label: string;
};

export type RangeType = {
  min: string;
  max: string;
};

export type SingleItemType = {
  key: string;
  title: string;
  children: {
    type: FilterType.Single;
    data: SourceItem[];
  };
};

export type MultipleItemType = {
  key: string;
  title: string;
  children: {
    type: FilterType.Multiple;
    data: SourceItem[];
  };
};

export type RangeItemType = {
  key: string;
  title: string;
  children: {
    type: FilterType.Range;
  };
};

export type FilterItemType = RangeItemType | MultipleItemType | SingleItemType;
export type FilterItemList = FilterItemType[];

export type SupportChainsType = {
  id: number;
  name: string;
};

export type KeyLabel = {
  key: string;
  label: string;
};

export type Owners = {
  id: string;
  userName: string;
  address: string;
  profileImage: string;
};

export type NftProtocolType = {
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
  metadata: {
    [x: string]: string;
  };
};

export type SaleTokens = {
  address: string;
  symbol: string;
  decimals: number;
  id: string;
};
export interface ItemsType {
  id: string;
  nftTokenId: number;
  minter: string;
  owners: Owners;
  uri: string;
  alias: string;
  quantity: number;
  totalQuantity: number;
  tokenHash: string;
  averagePrice: number;
  latestPrice: number;
  latestListingTime: number;
  metadata: {
    [x: string]: string;
  };
  nftProtocol: NftProtocolType;
  saleTokens: SaleTokens[];
}

export interface ItemsSource {
  items: ItemsType[];
  skipCount: number;
  maxResultCount: number;
}
