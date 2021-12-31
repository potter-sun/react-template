import { request } from 'api';
import { useCallback, useEffect, useState } from 'react';

export interface Collection {
  id: string;
  title: string;
  creator: string;
  description: string;
  background: string;
  avatar: string;
}

export interface Category {
  title: string;
  key: string;
  icon: string;
  collectionList: Collection[];
}

export const useCollections = () => {
  const [list, setList] = useState<Category[]>([]);
  const getList = useCallback(async () => {
    const result = await request.collections.GET_COLLECTIONS();
    setList(result);
  }, []);
  useEffect(() => {
    getList();
  }, [getList]);
  return list;
};
