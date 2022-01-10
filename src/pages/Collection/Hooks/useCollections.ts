import { request } from 'api';
import { useActiveWeb3React } from 'hooks/web3';
import { useCallback, useEffect, useState } from 'react';

export interface Creator {
  id: string;
  userName: string;
  address: string;
  profileImage: string;
}

export interface Metadata {
  meta1: string;
  meta2: string;
}

export interface Item {
  id: string;
  chainId: number;
  symbol: string;
  protocolName: string;
  nftType: string;
  totalSupply: number;
  background: string;
  description: string;
  creator: Creator;
  isBurnable: boolean;
  issueChainId: number;
  baseUri: string;
  isTokenIdReuse: boolean;
  metadata: Metadata;
}

export interface Collections {
  items: Item[];
}

export const useCollections = (type: string) => {
  const { chainId } = useActiveWeb3React();
  const [list, setList] = useState<Item[]>([]);
  const getList = useCallback(async () => {
    const result: Collections = await request.collections.GET_COLLECTIONS({
      params: { chainId, nftTyp: type, skipCount: 0, maxResultCount: 10 },
    });
    setList(result.items);
  }, [chainId, type]);
  useEffect(() => {
    getList();
  }, [getList]);
  return list;
};
