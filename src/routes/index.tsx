import Example from 'pages/Example';
import ExploreItems from 'pages/ExploreItems';
import Collection from 'pages/Collection';
import Settings from 'pages/Settings';

import { RoutesProps } from 'types';
export const routes: RoutesProps[] = [
  {
    path: '/',
    exact: true,
    element: Collection,
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
  {
    path: '/settings',
    exact: true,
    element: Settings,
  },
];
