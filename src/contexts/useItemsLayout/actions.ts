import { FilterItemList } from 'components/ItemsLayout/types';
import { basicActions } from 'contexts/utils';
export type RangeType = {
  min: string;
  max: string;
};
export type StringList = { [x: string]: string[] | RangeType[] };
const LayoutActions = {
  addFilterListActions: 'ADD_FILTER_LIST_ACTIONS',
  setFilterSelectActions: 'SET_FILTER_SELECT_ACTIONS',
  setCollapsedActions: 'SET_COLLAPSED_ACTIONS',
  destroy: 'DESTROY',
};

export type LayoutState = {
  filterList: null | FilterItemList;
  filterSelect: null | StringList;
  isCollapsed: boolean;
};

export const basicLayoutView = {
  setFilterList: {
    type: LayoutActions.addFilterListActions,
    actions: (v: FilterItemList) => basicActions(LayoutActions.addFilterListActions, { filterList: v }),
  },
  setFilterSelectList: {
    type: LayoutActions.setFilterSelectActions,
    actions: (v: StringList | null) => basicActions(LayoutActions.setFilterSelectActions, { filterSelect: v }),
  },
  setCollapsed: {
    type: LayoutActions.setCollapsedActions,
    actions: (v: boolean) => basicActions(LayoutActions.setCollapsedActions, { isCollapsed: v }),
  },
  setDestroy: {
    type: LayoutActions.destroy,
    actions: () => basicActions(LayoutActions.destroy),
  },
};
