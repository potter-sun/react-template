import { request } from 'api';
import { useActiveWeb3React } from 'hooks/web3';
import { useCallback, useEffect, useState } from 'react';

export interface NftTypes {
  items: string[];
}
export const useNftTypes = () => {
  const { chainId } = useActiveWeb3React();
  const [types, setTypes] = useState<string[]>([]);
  const getTypes = useCallback(async () => {
    const result: NftTypes = await request.collections.GET_NFT_TYPES({ params: { chainId } });
    setTypes(result?.items);
  }, [chainId]);
  useEffect(() => {
    getTypes();
  }, [getTypes]);
  return types;
};
