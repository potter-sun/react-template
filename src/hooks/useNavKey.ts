import { useMemo } from 'react';
import { useLocation } from 'react-router';
import { routes } from '../routes';
export function useNavKey() {
  const { pathname } = useLocation();
  return useMemo(
    () =>
      routes.map((item) => {
        return '';
      }),
    [],
  );
}
