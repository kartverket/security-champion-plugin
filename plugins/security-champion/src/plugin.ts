import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const securityChampionPlugin = createPlugin({
  id: 'security-champion',
  routes: {
    root: rootRouteRef,
  },
});

export const SecurityChampionPage = securityChampionPlugin.provide(
  createRoutableExtension({
    name: 'SecurityChampionPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
