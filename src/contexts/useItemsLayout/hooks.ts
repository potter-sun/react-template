import { useCallback } from 'react';
import { useLayoutItems } from '.';

export function useLayoutDispatch() {
  const [, { dispatch }] = useLayoutItems();
  return useCallback(dispatch, [dispatch]);
}
