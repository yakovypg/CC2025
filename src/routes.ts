import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig
} from "@vkontakte/vk-mini-apps-router";

export const DEFAULT_ROOT = "default_root";
export const DEFAULT_VIEW = "default_view";

export enum DefaultViewPanels {
  HOME = "HOME",
  CARDS = "CARDS",
  MISTAKES = "MISTAKES",
  PROFILE = "PROFILE",
  ACHIEVEMENT = "ACHIEVEMENT",
  RESULTS = "RESULTS",
  INFO = "INFO",
  ERROR = "ERROR"
}

export const getRoutePath = (view: string) => {
  return `/${view}`;
};

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

export const ROUTER = createHashRouter(ROUTES.getRoutes());
