import bridge, { UserInfo } from "@vkontakte/vk-bridge";
import { useRouteNavigator, useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";
import { View, ScreenSpinner } from "@vkontakte/vkui";
import { useState, useEffect } from "react";
import { StatusCode } from "status-code-enum";

import { getUserUrl, postUserUrl } from "./api";
import { BuildMode } from "./config";
import { UserProvider, useUser } from "./contexts";
import { Home, Cards, Mistakes, Profile, AchievementOverview, Results, Info, Error } from "./pages";
import { getRoutePath, DefaultViewPanels } from "./routes";
import { ErrorType, testUser } from "./utils";

export const LoadUserData = () => {
  const routeNavigator = useRouteNavigator();
  const { setUser } = useUser();

  const [loadingCount, setLoadingCount] = useState<number>(0);

  useEffect(() => {
    const incrementLoading = () => setLoadingCount((count) => count + 1);
    const decrementLoading = () => setLoadingCount((count) => Math.max(count - 1, 0));

    const loadUser = async (): Promise<UserInfo> => {
      return import.meta.env.MODE === BuildMode.DEVELOPMENT
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

        return addUserRes.status === StatusCode.SuccessCreated;
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
          pathname: getRoutePath(DefaultViewPanels.ERROR),
          search: {
            errorType: ErrorType.LOAD_DATA
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
  const { panel: activePanel = DefaultViewPanels.HOME } = useActiveVkuiLocation();

  return (
    <UserProvider>
      <LoadUserData />
      <View activePanel={activePanel}>
        <Home id={DefaultViewPanels.HOME} />
        <Cards id={DefaultViewPanels.CARDS} />
        <Mistakes id={DefaultViewPanels.MISTAKES} />
        <Profile id={DefaultViewPanels.PROFILE} />
        <AchievementOverview id={DefaultViewPanels.ACHIEVEMENT} />
        <Results id={DefaultViewPanels.RESULTS} />
        <Info id={DefaultViewPanels.INFO} />
        <Error id={DefaultViewPanels.ERROR} />
      </View>
    </UserProvider>
  );
};
