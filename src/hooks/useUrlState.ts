/* eslint-disable react-hooks/exhaustive-deps */
import { parse, stringify } from 'query-string';
import type { ParseOptions, StringifyOptions } from 'query-string';
import { useMemo, useRef, useCallback, SetStateAction, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

export interface Options {
  navigateMode?: 'push' | 'replace';
  parseOptions?: ParseOptions;
  stringifyOptions?: StringifyOptions;
  searchKeys?: string[];
}

const baseParseConfig: ParseOptions = {
  parseNumbers: false,
  parseBooleans: false,
  arrayFormat: 'index',
};

const baseStringifyConfig: StringifyOptions = {
  skipNull: false,
  skipEmptyString: false,
  arrayFormat: 'index',
};

type UrlState = Record<string, any>;

export default function useUrlState<S extends UrlState = UrlState>(initialState?: S | (() => S), options?: Options) {
  const [, update] = useState({});
  type State = Partial<{ [key in keyof S]: any }>;
  const { navigateMode = 'push', parseOptions, stringifyOptions, searchKeys } = options || {};

  const mergedParseOptions = { ...baseParseConfig, ...parseOptions };
  const mergedStringifyOptions = { ...baseStringifyConfig, ...stringifyOptions };

  const { search, hash } = useLocation();

  const navigate = useNavigate();
  const initialStateRef = useRef(typeof initialState === 'function' ? (initialState as () => S)() : initialState || {});

  const queryFromUrl = useMemo(() => {
    return parse(search, mergedParseOptions);
  }, [search]);
  const defaultSearch = useMemo(() => {
    const obj: any = {};
    if (searchKeys) {
      searchKeys?.forEach((i) => {
        obj[i] = undefined;
      });
      return obj;
    }
  }, [searchKeys]);
  const targetQuery: State = useMemo(() => {
    const searchObj: any = {
      ...initialStateRef.current,
      ...queryFromUrl,
    };
    const obj: any = {};
    if (searchKeys) {
      searchKeys?.forEach((i) => {
        if (searchObj[i]) obj[i] = searchObj[i];
      });
      return obj;
    }
    return searchObj;
  }, [queryFromUrl]);

  const setSearch = useCallback((search: string) => {
    navigate({ hash, search }, { replace: navigateMode === 'replace' });
  }, []);
  const setState = useCallback(
    (s: SetStateAction<State>) => {
      const newQuery = typeof s === 'function' ? s(targetQuery) : s;
      setSearch(stringify({ ...queryFromUrl, ...(defaultSearch ?? {}), ...newQuery }, mergedStringifyOptions) || '?');
      update({});
    },
    [setSearch, queryFromUrl, targetQuery, defaultSearch],
  );

  const clear = useCallback(() => {
    !defaultSearch ? setSearch('') : setState(defaultSearch);
  }, [defaultSearch, setState]);
  return [targetQuery, setState, clear] as const;
}
