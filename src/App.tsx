import { useState, useEffect } from "react";

import { UserInfo } from "@vkontakte/vk-bridge";
import { View, ScreenSpinner } from "@vkontakte/vkui";
import { useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";

import { Home, Cards, Mistakes, Profile, Achievement } from "./panels";
import { DEFAULT_VIEW_PANELS } from "./routes";

// import bridge from "@vkontakte/vk-bridge";

export const App = () => {
  const [user, setUser] = useState<UserInfo | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // bridge
    //   .send("VKWebAppGetUserInfo")
    //   .then((data) => setUser(data))
    //   .catch(console.error)
    //   .finally(() => setIsLoading(false));
    setUser(undefined);
    setIsLoading(false);
  }, []);

  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } =
    useActiveVkuiLocation();

  if (isLoading) {
    return <ScreenSpinner />;
  }

  return (
    <View activePanel={activePanel}>
      <Home id="home" />
      <Cards id="cards" />
      <Mistakes id="mistakes" />
      <Profile id="profile" user={user} />
      <Achievement id="achievement" />
    </View>
  );
};
