import { request } from 'api';
import { useLayoutItems } from 'contexts/useItemsLayout';
import { basicLayoutView } from 'contexts/useItemsLayout/actions';
import { useLayoutDispatch } from 'contexts/useItemsLayout/hooks';
import { useCallback, useEffect } from 'react';

export default function Updater() {
  const layoutDispatch = useLayoutDispatch();
  const [{ supportChains, supportSaleTokens }] = useLayoutItems();
  const getSupportChains = useCallback(async () => {
    const result: any = await request.collectionItems.GET_CHAINS_LIST();
    if (!result || !result?.items) return;
    const chainsList = result.items;
    layoutDispatch(basicLayoutView.setSupportChains.actions(chainsList));
  }, [layoutDispatch]);

  const getSupportSaleTokens = useCallback(async () => {
    const result: any = await request.collectionItems.GET_SALE_TOKENS_LIST();
    if (!result || !result?.items) return;
    const saleTokensList = result.items;
    layoutDispatch(basicLayoutView.setSupportSaleTokens.actions(saleTokensList));
  }, [layoutDispatch]);

  useEffect(() => {
    !supportChains && getSupportChains();
    !supportSaleTokens && getSupportSaleTokens();
  }, [getSupportChains, getSupportSaleTokens, supportChains, supportSaleTokens]);
  return null;
}
