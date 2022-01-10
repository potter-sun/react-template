import Example from 'pages/Example';
import ExploreItems from 'pages/ExploreItems';
import Collection from 'pages/Collection';
import Settings from 'pages/Settings';
import Detail from 'pages/Detail';

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
  {
    path: '/detail/:type/:tokenHash',
    exact: true,
    element: Detail,
  },
];
