import { useState, useEffect, ReactNode } from "react";
import bridge, { UserInfo } from "@vkontakte/vk-bridge";
import { View, SplitLayout, SplitCol, ScreenSpinner } from "@vkontakte/vkui";
import { useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";

import { Home, Cards, Mistakes, Profile } from "./panels";
import { DEFAULT_VIEW_PANELS } from "./routes";

import { Statistics, Achievements } from "../types";

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } =
    useActiveVkuiLocation();

  const [fetchedUser, setUser] = useState<UserInfo | undefined>();
  const [popout, setPopout] = useState<ReactNode | null>(<ScreenSpinner />);

  useEffect(() => {
    async function fetchData() {
      //const user = await bridge.send('VKWebAppGetUserInfo');
      //setUser(user);
      setUser(undefined);
      setPopout(null);
    }
    fetchData();
  }, []);

  const statistics: Statistics = {
    correctAnswers: 10,
    incorrectAnswers: 5,
    bestSeries: 7,
    strikeCounter: 1,
  };

  const achievements: Achievements = {
    daysInStrikeLevel: 1,
    rightAnswersLevel: 55,
    perfectSeriesLevel: 100,
    veteranLevel: 777,
  };

  return (
    <SplitLayout>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id="home" />
          <Cards id="cards" />
          <Mistakes id="mistakes" />
          <Profile
            id="profile"
            user={fetchedUser}
            statistics={statistics}
            achievements={achievements}
          />
        </View>
      </SplitCol>
      {popout}
    </SplitLayout>
  );
};
