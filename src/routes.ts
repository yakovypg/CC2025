import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig
} from "@vkontakte/vk-mini-apps-router";

export const defaultRoot = "default_root";
export const defaultView = "default_view";

export const defaultViewPanels = {
  home: "home",
  cards: "cards",
  mistakes: "mistakes",
  profile: "profile",
  achievement: "achievement",
  error: "error"
} as const;

export const getRoutePath = (view: string) => {
  return `/${view}`;
};

export const routes = RoutesConfig.create([
  createRoot(defaultRoot, [
    createView(defaultView, [
      createPanel(defaultViewPanels.home, "/", []),
      createPanel(defaultViewPanels.cards, getRoutePath(defaultViewPanels.cards), []),
      createPanel(defaultViewPanels.mistakes, getRoutePath(defaultViewPanels.mistakes), []),
      createPanel(defaultViewPanels.profile, getRoutePath(defaultViewPanels.profile), []),
      createPanel(defaultViewPanels.achievement, getRoutePath(defaultViewPanels.achievement), []),
      createPanel(defaultViewPanels.error, getRoutePath(defaultViewPanels.error), [])
    ])
  ])
]);

export const router = createHashRouter(routes.getRoutes());
