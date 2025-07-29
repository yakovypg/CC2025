import { RouteNavigator, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Panel, NavIdProps, ScreenSpinner } from "@vkontakte/vkui";
import { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { getUserAchievementsUrl, getUserStatisticsUrl } from "../api";
import { AppHeader, ProfileCover, ProfileAchievements, StatisticsInfo } from "../components";
import { UserContext, useUser } from "../contexts";
import { getRoutePath, DefaultViewPanels } from "../routes";
import {
  Statistics,
  StatisticsModel,
  Achievements,
  AchievementsModel,
  AppHeaderButtonType
} from "../types";
import { ErrorType } from "../utils";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export const Profile: FC<NavIdProps> = ({ id }: NavIdProps) => {
  const { t } = useTranslation();
  const routeNavigator: RouteNavigator = useRouteNavigator();
  const userContext: UserContext = useUser();

  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [achievements, setAchievements] = useState<Achievements | null>(null);
  const [loadingCount, setLoadingCount] = useState<number>(0);

  useEffect(() => {
    if (userContext.user === undefined) {
      routeNavigator.push("/");
      return;
    }

    const userId: number = userContext.user.id;

    const incrementLoading = () => setLoadingCount((count: number) => count + 1);
    const decrementLoading = () => setLoadingCount((count: number) => Math.max(count - 1, 0));

    const loadData = async () => {
      let statisticsData: StatisticsModel | null = null;
      let achievementsData: AchievementsModel | null = null;

      const statisticsUrl: string = getUserStatisticsUrl(userId);
      const achievementsUrl: string = getUserAchievementsUrl(userId);

      incrementLoading();

      try {
        const res: Response = await fetch(statisticsUrl);
        statisticsData = await res.json();
      } catch (error) {
        console.log(error);
      } finally {
        decrementLoading();
      }

      incrementLoading();

      try {
        const res: Response = await fetch(achievementsUrl);
        achievementsData = await res.json();
      } catch (error) {
        console.log(error);
      } finally {
        decrementLoading();
      }

      if (statisticsData === null || achievementsData === null) {
        routeNavigator.push({
          pathname: getRoutePath(DefaultViewPanels.ERROR),
          search: {
            errorType: ErrorType.LOAD_DATA
          }
        });
      } else {
        setStatistics(statisticsData);
        setAchievements(achievementsData);
      }
    };

    loadData();
  }, []);

  const isLoading: boolean = loadingCount > 0;

  if (isLoading || statistics === null || achievements === null || userContext.user === undefined) {
    return <ScreenSpinner />;
  }

  const userId: number = userContext.user.id;
  const firstName: string = userContext.user.first_name;
  const lastName: string = userContext.user.last_name;
  const photo200: string = userContext.user.photo_200;

  return (
    <Panel id={id}>
      <AppHeader title={t("title.profile")} buttonType={AppHeaderButtonType.BACK} />
      <ProfileCover userPhoto={photo200} userFirstName={firstName} userLastName={lastName} />
      <StatisticsInfo statistics={statistics} />
      <ProfileAchievements userId={userId} achievements={achievements} />
    </Panel>
  );
};
