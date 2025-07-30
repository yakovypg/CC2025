import vkBridge, { AppearanceType, EGetLaunchParamsResponsePlatforms } from "@vkontakte/vk-bridge";
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
import { getLaunchPlatform } from "./config";
import { ROUTER } from "./routes";
import { transformVkBridgeAdaptivity } from "./utils";

import "@vkontakte/vkui/dist/vkui.css";

export const AppProviders = (): ReactNode => {
  const vkBridgeAppearance: AppearanceType | undefined = useAppearance() || undefined;
  const vkBridgeInsets: SafeAreaInsets | undefined = useInsets() || undefined;
  const adaptivity: AdaptivityProps = transformVkBridgeAdaptivity(useAdaptivity());
  const vkPlatform: EGetLaunchParamsResponsePlatforms | undefined = getLaunchPlatform();

  return (
    <ConfigProvider
      colorScheme={vkBridgeAppearance}
      platform={vkPlatform === EGetLaunchParamsResponsePlatforms.DESKTOP_WEB ? "vkcom" : undefined}
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
