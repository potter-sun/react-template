export enum FilterType {
  Single,
  Multiple,
  Range,
}

export type SourceItem = {
  value: string;
  label: string;
};

export type RangeType = {
  min: string;
  max: string;
};

export type SingleItemType = {
  key: string;
  title: string;
  children: {
    type: FilterType.Single;
    data: SourceItem[];
  };
};

export type MultipleItemType = {
  key: string;
  title: string;
  children: {
    type: FilterType.Multiple;
    data: SourceItem[];
  };
};

export type RangeItemType = {
  key: string;
  title: string;
  children: {
    type: FilterType.Range;
  };
};

export type FilterItemType = RangeItemType | MultipleItemType | SingleItemType;
export type FilterItemList = FilterItemType[];
