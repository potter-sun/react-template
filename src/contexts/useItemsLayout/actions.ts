import { FilterItemList } from 'components/ItemsLayout/types';
import { basicActions } from 'contexts/utils';

const LayoutActions = {
  addFilterListActions: 'addFilterListActions',
  destroy: 'DESTROY',
};

export type LayoutState = {
  filterList: null | FilterItemList;
};

export const basicLayoutView = {
  setFilterList: {
    type: LayoutActions.addFilterListActions,
    actions: (v: FilterItemList) => basicActions(LayoutActions.addFilterListActions, { filterList: v }),
  },
  setDestroy: {
    type: LayoutActions.destroy,
    actions: () => basicActions(LayoutActions.destroy),
  },
};
