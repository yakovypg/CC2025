import vkBridge, {
  AppearanceType,
  EGetLaunchParamsResponsePlatforms,
  parseURLSearchParamsForGetLaunchParams
} from "@vkontakte/vk-bridge";
import { LaunchParams } from "@vkontakte/vk-bridge/dist/types/src/parseURLSearchParamsForGetLaunchParams";
import { useAdaptivity, useAppearance, useInsets } from "@vkontakte/vk-bridge-react";
import { RouterProvider } from "@vkontakte/vk-mini-apps-router";
import {
  AdaptivityProvider,
  ConfigProvider,
  AppRoot,
  AdaptivityProps,
  SafeAreaInsets
} from "@vkontakte/vkui";
import { ReactNode } from "react";

import { App } from "./App";
import { ROUTER } from "./routes";
import { transformVkBridgeAdaptivity } from "./utils";

import "@vkontakte/vkui/dist/vkui.css";

export const AppProviders = (): ReactNode => {
  const vkBridgeAppearance: AppearanceType | undefined = useAppearance() || undefined;
  const vkBridgeInsets: SafeAreaInsets | undefined = useInsets() || undefined;
  const adaptivity: AdaptivityProps = transformVkBridgeAdaptivity(useAdaptivity());

  const urlSearchParams: Partial<LaunchParams> = parseURLSearchParamsForGetLaunchParams(
    window.location.search
  );

  const vkPlatform: EGetLaunchParamsResponsePlatforms | undefined = urlSearchParams.vk_platform;

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
