import Example from 'pages/Example';
import ExploreItems from 'pages/ExploreItems';
import Overview from 'pages/Overview';

import { RoutesProps } from 'types';
export const routes: RoutesProps[] = [
  {
    path: '/',
    exact: true,
    element: Overview,
  },
  {
    path: '/explore-items/:collectId',
    exact: true,
    element: ExploreItems,
  },
  {
    path: '/example',
    exact: true,
    element: Example,
  },
];
