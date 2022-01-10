import { BasicActions, formatToMap, formatToUrl } from 'contexts/utils';
import useUrlState from 'hooks/useUrlState';
import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { basicLayoutView, LayoutState } from './actions';

export const SORT_BY = 'sortBy';

const DEFAULT_STATE = {
  filterList: null,
  filterSelect: null,
  isCollapsed: false,
  selectList: null,
  itemsSource: null,
};

const INITIAL_STATE = {
  ...DEFAULT_STATE,
  supportChains: null,
  supportSaleTokens: null,
};
const ItemsLayoutContext = createContext<any>(INITIAL_STATE);

export function useLayoutItems(): [LayoutState, BasicActions] {
  return useContext(ItemsLayoutContext);
}

//reducer
function reducer(state: any, { type, payload }: any) {
  switch (type) {
    case basicLayoutView.setFilterList.type: {
      return Object.assign({}, state, payload);
    }
    case basicLayoutView.setCollapsed.type: {
      return Object.assign({}, state, payload);
    }
    case basicLayoutView.setItemsList.type: {
      return Object.assign({}, state, payload);
    }
    case basicLayoutView.setSupportChains.type: {
      return Object.assign({}, state, payload);
    }
    case basicLayoutView.setSupportSaleTokens.type: {
      return Object.assign({}, state, payload);
    }
    case basicLayoutView.setDestroy.type: {
      return Object.assign({}, state, DEFAULT_STATE);
    }
    default: {
      const { destroy } = payload;
      if (destroy) return Object.assign({}, payload);
      return Object.assign({}, state, payload);
    }
  }
}

export default function Provider({ children }: { children: React.ReactNode }) {
  const [state, d] = useReducer(reducer, INITIAL_STATE);
  const { filterList, selectList } = state;
  const searchKeys = useMemo(
    () => filterList?.map((i: any) => i.key).concat(selectList ? [SORT_BY] : []),
    [filterList, selectList],
  );
  const [filterSelect, setUrl, clearUrl] = useUrlState({}, { searchKeys });

  const dispatch = useCallback(({ type, payload }: { type: string; payload: any }) => {
    if (type === basicLayoutView.setFilterSelectList.type) {
      const selectUrlParams = formatToUrl(payload?.filterSelect);
      if (selectUrlParams) {
        setUrl(selectUrlParams);
      } else {
        clearUrl();
      }
    } else {
      d({ type, payload });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const sel = useMemo(() => {
    return formatToMap(filterSelect);
  }, [filterSelect]);
  return (
    <ItemsLayoutContext.Provider
      value={useMemo(() => [{ ...state, filterSelect: sel }, { dispatch }], [state, sel, dispatch])}>
      {children}
    </ItemsLayoutContext.Provider>
  );
}
