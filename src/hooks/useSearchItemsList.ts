import { useLayoutItems } from 'contexts/useItemsLayout';
import { useEffect } from 'react';
import { useLocation } from 'react-router';

export default function useSearchItemsList() {
  //   const localtion = useLocation();
  //   console.log(localtion, 'localtion');
  const [{ filterSelect }] = useLayoutItems();
  useEffect(() => {
    console.log(filterSelect, 'filterSelect');
  }, [filterSelect]);
}
