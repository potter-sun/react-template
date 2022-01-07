import {
  FilterItemList,
  ItemsSource,
  ItemsType,
  KeyLabel,
  SaleTokens,
  SupportChainsType,
} from 'components/ItemsLayout/types';
import { basicActions } from 'contexts/utils';
export type RangeType = {
  min: string;
  max: string;
};
export type StringMap = { [x: string]: string[] | RangeType[] };
const LayoutActions = {
  addFilterListActions: 'ADD_FILTER_LIST_ACTIONS',
  setFilterSelectActions: 'SET_FILTER_SELECT_ACTIONS',
  setCollapsedActions: 'SET_COLLAPSED_ACTIONS',
  setSelectListActions: 'SET_SELECT_LIST_ACTIONS',
  setItemsListActions: 'SET_ITEMS_LIST_ACTIONS',
  setSupportChainsActions: 'SET_SUPPORT_CHAINS_ACTIONS',
  setSupportSaleTokensActions: 'SET_SUPPORT_SALE_TOKENS_ACTIONS',
  destroy: 'DESTROY',
};

export type LayoutState = {
  filterList: null | FilterItemList;
  filterSelect: null | StringMap;
  isCollapsed: boolean;
  selectList: null | KeyLabel[];
  itemsSource: ItemsSource | null;
  supportChains: SupportChainsType[];
  supportSaleTokens: SaleTokens[];
};

export const basicLayoutView = {
  setFilterList: {
    type: LayoutActions.addFilterListActions,
    actions: (v: FilterItemList) => basicActions(LayoutActions.addFilterListActions, { filterList: v }),
  },
  setFilterSelectList: {
    type: LayoutActions.setFilterSelectActions,
    actions: (v: StringMap | null) => basicActions(LayoutActions.setFilterSelectActions, { filterSelect: v }),
  },
  setCollapsed: {
    type: LayoutActions.setCollapsedActions,
    actions: (v: boolean) => basicActions(LayoutActions.setCollapsedActions, { isCollapsed: v }),
  },
  setSelectList: {
    type: LayoutActions.setSelectListActions,
    actions: (v: KeyLabel[]) => basicActions(LayoutActions.setSelectListActions, { selectList: v }),
  },
  setItemsList: {
    type: LayoutActions.setItemsListActions,
    actions: (v: ItemsSource) => basicActions(LayoutActions.setItemsListActions, { itemsSource: v }),
  },
  setSupportChains: {
    type: LayoutActions.setSupportChainsActions,
    actions: (v: SupportChainsType[]) => basicActions(LayoutActions.setSupportChainsActions, { supportChains: v }),
  },
  setSupportSaleTokens: {
    type: LayoutActions.setSupportSaleTokensActions,
    actions: (v: SaleTokens[]) => basicActions(LayoutActions.setSupportSaleTokensActions, { supportSaleTokens: v }),
  },
  setDestroy: {
    type: LayoutActions.destroy,
    actions: () => basicActions(LayoutActions.destroy),
  },
};
