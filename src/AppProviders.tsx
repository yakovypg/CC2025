import vkBridge, { parseURLSearchParamsForGetLaunchParams } from "@vkontakte/vk-bridge";
import { useAdaptivity, useAppearance, useInsets } from "@vkontakte/vk-bridge-react";
import { RouterProvider } from "@vkontakte/vk-mini-apps-router";
import { AdaptivityProvider, ConfigProvider, AppRoot } from "@vkontakte/vkui";

import { App } from "./App";
import { ROUTER } from "./routes";
import { transformVkBridgeAdaptivity } from "./utils";

import "@vkontakte/vkui/dist/vkui.css";

export const AppProviders = () => {
  const vkBridgeAppearance = useAppearance() || undefined;
  const vkBridgeInsets = useInsets() || undefined;
  const adaptivity = transformVkBridgeAdaptivity(useAdaptivity());

  const urlSearchParams = parseURLSearchParamsForGetLaunchParams(window.location.search);
  const vkPlatform = urlSearchParams.vk_platform;

  return (
    <ConfigProvider
      colorScheme={vkBridgeAppearance}
      platform={vkPlatform === "desktop_web" ? "vkcom" : undefined}
      isWebView={vkBridge.isWebView()}
      hasCustomPanelHeaderAfter={false}>
      <AdaptivityProvider {...adaptivity}>
        <AppRoot mode="full" safeAreaInsets={vkBridgeInsets}>
          <RouterProvider router={ROUTER}>
            <App />
          </RouterProvider>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};
