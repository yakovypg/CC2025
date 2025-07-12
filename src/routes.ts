import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig
} from "@vkontakte/vk-mini-apps-router";

export const DEFAULT_ROOT = "default_root";
export const DEFAULT_VIEW = "default_view";

export const DEFAULT_VIEW_PANELS = {
  HOME: "home",
  CARDS: "cards",
  MISTAKES: "mistakes",
  PROFILE: "profile",
  ACHIEVEMENT: "achievement",
  ERROR: "error"
} as const;

export const getRoutePath = (view: string) => {
  return `/${view}`;
};

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.HOME, "/", []),
      createPanel(
        DEFAULT_VIEW_PANELS.CARDS,
        getRoutePath(DEFAULT_VIEW_PANELS.CARDS),
        []
      ),
      createPanel(
        DEFAULT_VIEW_PANELS.MISTAKES,
        getRoutePath(DEFAULT_VIEW_PANELS.MISTAKES),
        []
      ),
      createPanel(
        DEFAULT_VIEW_PANELS.PROFILE,
        getRoutePath(DEFAULT_VIEW_PANELS.PROFILE),
        []
      ),
      createPanel(
        DEFAULT_VIEW_PANELS.ACHIEVEMENT,
        getRoutePath(DEFAULT_VIEW_PANELS.ACHIEVEMENT),
        []
      ),
      createPanel(
        DEFAULT_VIEW_PANELS.ERROR,
        getRoutePath(DEFAULT_VIEW_PANELS.ERROR),
        []
      )
    ])
  ])
]);

export const router = createHashRouter(routes.getRoutes());
