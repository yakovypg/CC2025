import vkBridge, { ReceiveDataMap, VKBridgeEvent } from "@vkontakte/vk-bridge";
import { createRoot } from "react-dom/client";

import { AppProviders } from "./AppProviders";
import { BuildMode } from "./config";

import "./i18n";

if (import.meta.env.MODE === BuildMode.DEVELOPMENT) {
  vkBridge.subscribe((e: VKBridgeEvent<keyof ReceiveDataMap>) => console.log(e));
  import("./eruda.ts");
}

vkBridge.send("VKWebAppInit");
createRoot(document.getElementById("root")!).render(<AppProviders />);
