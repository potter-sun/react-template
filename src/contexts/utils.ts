export const basicActions = (type: string, payload?: any) => ({
  type,
  payload,
});

export type BasicActions = {
  dispatch: (actions: { type: string; payload: any }) => void;
};

export const formatToUrl = (val: any) => {
  if (!val) return null;
  const selectString = {};
  Object.entries(val || {}).forEach((item) => {
    const [key, v]: [string, any] = item;
    if (typeof v?.[0] === 'undefined') return;
    if (typeof v?.[0] === 'string') return Object.assign(selectString, { [key]: v });
    return Object.assign(selectString, { [key]: JSON.stringify(v) });
  });
  return selectString;
};

export const formatToMap = (filterSelect: any) => {
  const filter = { ...filterSelect };
  Object.entries(filterSelect).forEach(([key, v]) => {
    if (typeof v === 'string') return Object.assign(filter, { [key]: JSON.parse(v) });
  });
  return filter;
};
