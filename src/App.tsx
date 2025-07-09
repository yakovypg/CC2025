import { View } from "@vkontakte/vkui";
import { useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";

import { Home, Cards, Mistakes, Profile, Achievement } from "./panels";
import { DEFAULT_VIEW_PANELS } from "./routes";

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } =
    useActiveVkuiLocation();

  return (
    <View activePanel={activePanel}>
      <Home id="home" />
      <Cards id="cards" />
      <Mistakes id="mistakes" />
      <Profile id="profile" />
      <Achievement id="achievement" />
    </View>
  );
};
