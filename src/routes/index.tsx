import Example from 'pages/Example';
import Overview from 'pages/Overview';
import { RoutesProps } from 'types';
export const routes: RoutesProps[] = [
  {
    path: '/',
    exact: true,
    element: Overview,
  },
  {
    path: '/example',
    exact: true,
    element: Example,
  },
];
