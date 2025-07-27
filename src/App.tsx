import bridge, { UserInfo } from "@vkontakte/vk-bridge";
import { useRouteNavigator, useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";
import { View, ScreenSpinner } from "@vkontakte/vkui";
import { useState, useEffect } from "react";
import { StatusCode } from "status-code-enum";

import { getUserUrl, postUserUrl } from "./api";
import { UserProvider, useUser } from "./context";
import {
  Home,
  Cards,
  Mistakes,
  Profile,
  AchievementOverview,
  Results,
  Info,
  Error
} from "./panels";
import { getRoutePath, defaultViewPanels } from "./routes";
import { ErrorType, testUser } from "./utils";

export const LoadUserData = () => {
  const routeNavigator = useRouteNavigator();
  const { setUser } = useUser();

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
  }, []);

  const isLoading = loadingCount > 0;

  if (isLoading) {
    return <ScreenSpinner />;
  }

  return null;
};

export const App = () => {
  const { panel: activePanel = defaultViewPanels.home } = useActiveVkuiLocation();

  return (
    <UserProvider>
      <LoadUserData />
      <View activePanel={activePanel}>
        <Home id="home" />
        <Cards id="cards" />
        <Mistakes id="mistakes" />
        <Profile id="profile" />
        <AchievementOverview id="achievement" />
        <Results id="results" />
        <Info id="info" />
        <Error id="error" />
      </View>
    </UserProvider>
  );
};
