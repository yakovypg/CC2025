import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from '@vkontakte/vk-mini-apps-router';

export const DEFAULT_ROOT = 'default_root';
export const DEFAULT_VIEW = 'default_view';

export const DEFAULT_VIEW_PANELS = {
  HOME: 'home',
  CARDS: 'cards',
  MISTAKES: 'mistakes',
  PROFILE: 'profile'
} as const;

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.HOME, '/', []),
      createPanel(DEFAULT_VIEW_PANELS.CARDS, `/${DEFAULT_VIEW_PANELS.CARDS}`, []),
      createPanel(DEFAULT_VIEW_PANELS.MISTAKES, `/${DEFAULT_VIEW_PANELS.MISTAKES}`, []),
      createPanel(DEFAULT_VIEW_PANELS.PROFILE, `/${DEFAULT_VIEW_PANELS.PROFILE}`, []),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
