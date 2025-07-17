import { useState, useEffect } from "react";
import { StatusCode } from "status-code-enum";

import bridge, { UserInfo } from "@vkontakte/vk-bridge";
import { View, ScreenSpinner } from "@vkontakte/vkui";
import { useRouteNavigator, useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";

import { Home, Cards, Mistakes, Profile, AchievementOverview, Error } from "./panels";
import { ErrorType, testUser } from "./utils";
import { getUserUrl, postUserUrl } from "./api";
import { getRoutePath, defaultViewPanels } from "./routes";

export const App = () => {
  const routeNavigator = useRouteNavigator();

  const [user, setUser] = useState<UserInfo | undefined>(undefined);
  const [loadingCount, setLoadingCount] = useState<number>(0);

  useEffect(() => {
    const incrementLoading = () => setLoadingCount((count) => count + 1);
    const decrementLoading = () => setLoadingCount((count) => Math.max(count - 1, 0));

    const loadUser = async (): Promise<UserInfo> => {
      return import.meta.env.MODE === "development"
        ? testUser
        : await bridge.send("VKWebAppGetUserInfo");
    };

    const confirmUser = async (userId: number): Promise<boolean> => {
      const userUrl = getUserUrl(userId);
      const addUserUrl = postUserUrl();

      try {
        const getUserRes = await fetch(userUrl);

        if (getUserRes.status === StatusCode.SuccessOK) {
          return true;
        }
      } catch {
        console.log("Server do not know user");
      }

      try {
        const addUserRes = await fetch(addUserUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ id: userId })
        });

        return addUserRes.status == StatusCode.SuccessCreated;
      } catch {
        console.log("Failed to add user");
      }

      return false;
    };

    const loadData = async () => {
      let user: UserInfo | null = null;
      let userConfirmed: boolean = false;

      incrementLoading();

      try {
        user = await loadUser();
      } catch (error) {
        console.log(error);
      } finally {
        decrementLoading();
      }

      incrementLoading();

      try {
        userConfirmed = (user && (await confirmUser(user.id))) ?? false;
      } catch (error) {
        console.log(error);
      } finally {
        decrementLoading();
      }

      if (user === null || !userConfirmed) {
        routeNavigator.push({
          pathname: getRoutePath(defaultViewPanels.error),
          search: {
            errorType: ErrorType.loadData
          }
        });
      } else {
        setUser(user);
      }
    };

    loadData();
  }, [routeNavigator]);

  const isLoading = loadingCount > 0;
  const { panel: activePanel = defaultViewPanels.home } = useActiveVkuiLocation();

  if (isLoading) {
    return <ScreenSpinner />;
  }

  return (
    <View activePanel={activePanel}>
      <Home id="home" />
      <Cards id="cards" />
      <Mistakes id="mistakes" />
      <Profile id="profile" user={user} />
      <AchievementOverview id="achievement" />
      <Error id="error" />
    </View>
  );
};
