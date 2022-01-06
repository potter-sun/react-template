import { BasicActions } from 'contexts/utils';
import { createContext, useContext, useMemo, useReducer } from 'react';
import { basicLayoutView, LayoutState } from './actions';

const INITIAL_STATE = {
  filterList: null,
  filterSelect: null,
  isCollapsed: false,
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
    case basicLayoutView.setFilterSelectList.type: {
      return Object.assign({}, state, payload);
    }
    case basicLayoutView.setCollapsed.type: {
      return Object.assign({}, state, payload);
    }
    case basicLayoutView.setDestroy.type: {
      return Object.assign({});
    }
    default: {
      const { destroy } = payload;
      if (destroy) return Object.assign({}, payload);
      return Object.assign({}, state, payload);
    }
  }
}

export default function Provider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <ItemsLayoutContext.Provider value={useMemo(() => [{ ...state }, { dispatch }], [state, dispatch])}>
      {children}
    </ItemsLayoutContext.Provider>
  );
}
