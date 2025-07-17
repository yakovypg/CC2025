import { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Panel, NavIdProps, ScreenSpinner } from "@vkontakte/vkui";

import { UserInfo } from "@vkontakte/vk-bridge";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

import { ErrorType } from "../utils";
import { AppHeaderButtonType } from "../types";
import { getRoutePath, DEFAULT_VIEW_PANELS } from "../routes";
import { getUserAchievementsUrl, getUserStatisticsUrl } from "../api";

import { AppHeader, ProfileCover, ProfileAchievements, StatisticsInfo } from "../components";
import { Statistics, StatisticsModel, Achievements, AchievementsModel } from "../types";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export interface ProfileProps extends NavIdProps {
  user?: UserInfo;
}

export const Profile: FC<ProfileProps> = ({ id, user }) => {
  const { t } = useTranslation();
  const routeNavigator = useRouteNavigator();

  const user_id = user?.id.toString() ?? "";
  const first_name = user?.first_name ?? t("profilePage.user");
  const last_name = user?.last_name ?? "1";
  const photo_200 = user?.photo_200;

  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [achievements, setAchievements] = useState<Achievements | null>(null);
  const [loadingCount, setLoadingCount] = useState<number>(0);

  useEffect(() => {
    const incrementLoading = () => setLoadingCount((count) => count + 1);
    const decrementLoading = () => setLoadingCount((count) => Math.max(count - 1, 0));

    const loadData = async () => {
      let statisticsData: StatisticsModel | null = null;
      let achievementsData: AchievementsModel | null = null;

      const statisticsUrl = getUserStatisticsUrl(user_id);
      const achievementsUrl = getUserAchievementsUrl(user_id);

      incrementLoading();

      try {
        const res = await fetch(statisticsUrl);
        statisticsData = await res.json();
      } catch (error) {
        console.log(error);
      } finally {
        decrementLoading();
      }

      incrementLoading();

      try {
        const res = await fetch(achievementsUrl);
        achievementsData = await res.json();
      } catch (error) {
        console.log(error);
      } finally {
        decrementLoading();
      }

      if (statisticsData === null || achievementsData === null) {
        routeNavigator.push({
          pathname: getRoutePath(DEFAULT_VIEW_PANELS.ERROR),
          search: {
            errorType: ErrorType.loadData
          }
        });
      } else {
        setStatistics(statisticsData);
        setAchievements(achievementsData);
      }
    };

    loadData();
  }, [user_id, routeNavigator]);

  const isLoading = loadingCount > 0;

  if (isLoading || statistics === null || achievements === null) {
    return <ScreenSpinner />;
  }

  return (
    <Panel id={id}>
      <AppHeader title={t("title.profile")} buttonType={AppHeaderButtonType.back} />

      <ProfileCover
        user_photo={photo_200}
        user_first_name={first_name}
        user_last_name={last_name}
      />

      <StatisticsInfo statistics={statistics} />
      <ProfileAchievements userId={user_id} achievements={achievements} />
    </Panel>
  );
};
