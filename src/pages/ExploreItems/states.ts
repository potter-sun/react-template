import { FilterItemList, FilterType, KeyLabel } from 'components/ItemsLayout/types';

export const selectList: KeyLabel[] = [
  { key: 'price-ascend', label: 'Price: Low to High' },
  { key: 'price-descend', label: 'Price: High to Low' },
  { key: 'Recently Listed', label: 'Recently Listed' },
];

export const filterList: FilterItemList = [
  {
    key: 'owner',
    title: 'Status',
    children: {
      type: FilterType.Single,
      data: [
        { value: 'Buy Now', label: 'Buy Now' },
        { value: 'My Items', label: 'My Items' },
      ],
    },
  },
  {
    key: 'price',
    title: 'Price',
    children: {
      type: FilterType.Range,
    },
  },
  {
    key: 'chainId',
    title: 'Chains',
    children: {
      type: FilterType.Multiple,
      data: [
        { value: 'AELF', label: 'Main AELF' },
        { value: 'tDVV', label: 'Side tDVV' },
      ],
    },
  },
  {
    key: 'saleTokenId',
    title: 'On Sales In',
    children: {
      type: FilterType.Multiple,
      data: [
        { value: 'ELF', label: 'ELF' },
        { value: 'USDT', label: 'USDT' },
      ],
    },
  },
];
