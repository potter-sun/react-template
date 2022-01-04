import { FilterItemList } from 'components/ItemsLayout/types';
import { basicActions } from 'contexts/utils';
type StringList = { [x: string]: string[] };
const LayoutActions = {
  addFilterListActions: 'ADD_FILTER_LIST_ACTIONS',
  setFilterSelectActions: 'SET_FILTER_SELECT_ACTIONS',
  destroy: 'DESTROY',
};

export type LayoutState = {
  filterList: null | FilterItemList;
  filterSelect: null | StringList;
};

export const basicLayoutView = {
  setFilterList: {
    type: LayoutActions.addFilterListActions,
    actions: (v: FilterItemList) => basicActions(LayoutActions.addFilterListActions, { filterList: v }),
  },
  setFilterSelectList: {
    type: LayoutActions.setFilterSelectActions,
    actions: (v: StringList) => basicActions(LayoutActions.setFilterSelectActions, { filterSelect: v }),
  },
  setDestroy: {
    type: LayoutActions.destroy,
    actions: () => basicActions(LayoutActions.destroy),
  },
};
