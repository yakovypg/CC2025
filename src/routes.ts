import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig
} from "@vkontakte/vk-mini-apps-router";

export const DEFAULT_ROOT: string = "default_root";
export const DEFAULT_VIEW: string = "default_view";

export enum DefaultViewPanels {
  HOME = "home",
  CARDS = "cards",
  MISTAKES = "mistakes",
  PROFILE = "profile",
  ACHIEVEMENT = "achievement",
  RESULTS = "results",
  INFO = "info",
  ERROR = "error"
}

export const getRoutePath = (view: string): string => {
  return `/${view}`;
};

// eslint-disable-next-line @typescript-eslint/typedef
export const ROUTES = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DefaultViewPanels.HOME, "/", []),
      createPanel(DefaultViewPanels.CARDS, getRoutePath(DefaultViewPanels.CARDS), []),
      createPanel(DefaultViewPanels.MISTAKES, getRoutePath(DefaultViewPanels.MISTAKES), []),
      createPanel(DefaultViewPanels.PROFILE, getRoutePath(DefaultViewPanels.PROFILE), []),
      createPanel(DefaultViewPanels.ACHIEVEMENT, getRoutePath(DefaultViewPanels.ACHIEVEMENT), []),
      createPanel(DefaultViewPanels.RESULTS, getRoutePath(DefaultViewPanels.RESULTS), []),
      createPanel(DefaultViewPanels.INFO, getRoutePath(DefaultViewPanels.INFO), []),
      createPanel(DefaultViewPanels.ERROR, getRoutePath(DefaultViewPanels.ERROR), [])
    ])
  ])
]);

// eslint-disable-next-line @typescript-eslint/typedef
export const ROUTER = createHashRouter(ROUTES.getRoutes());
