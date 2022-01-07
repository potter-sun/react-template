import { request } from 'api';
import { useLayoutItems } from 'contexts/useItemsLayout';
import { basicLayoutView } from 'contexts/useItemsLayout/actions';
import { useLayoutDispatch } from 'contexts/useItemsLayout/hooks';
import { useCallback, useEffect } from 'react';

export default function useItemsList() {
  const [{ itemsSource }] = useLayoutItems();
  const layoutDispatch = useLayoutDispatch();
  const getItemsList = useCallback(async () => {
    const result = await request.collectionItems.GET_COLLECTIONS_ITEMS_LIST({});
    if (!result || !result?.items) return;
    layoutDispatch(basicLayoutView.setItemsList.actions(result));
  }, [layoutDispatch]);

  useEffect(() => {
    getItemsList();
  }, [getItemsList]);
}
