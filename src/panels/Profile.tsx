import { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Panel, NavIdProps, ScreenSpinner } from "@vkontakte/vkui";

import { UserInfo } from "@vkontakte/vk-bridge";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

import { ErrorType } from "../utils";
import { AppHeaderButtonType } from "../types";
import { getRoutePath, defaultViewPanels } from "../routes";
import { getUserAchievementsUrl, getUserStatisticsUrl } from "../api";

import { AppHeader, ProfileCover, ProfileAchievements, StatisticsInfo } from "../components";
import { Statistics, StatisticsModel, Achievements, AchievementsModel } from "../types";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export interface ProfileProps extends NavIdProps {
  user: UserInfo;
}

export const Profile: FC<ProfileProps> = ({ id, user }) => {
  const { t } = useTranslation();
  const routeNavigator = useRouteNavigator();

  const userId = user.id;
  const firstName = user.first_name;
  const lastName = user.last_name;
  const photo200 = user.photo_200;

  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [achievements, setAchievements] = useState<Achievements | null>(null);
  const [loadingCount, setLoadingCount] = useState<number>(0);

  useEffect(() => {
    const incrementLoading = () => setLoadingCount((count) => count + 1);
    const decrementLoading = () => setLoadingCount((count) => Math.max(count - 1, 0));

    const loadData = async () => {
      let statisticsData: StatisticsModel | null = null;
      let achievementsData: AchievementsModel | null = null;

      const statisticsUrl = getUserStatisticsUrl(userId);
      const achievementsUrl = getUserAchievementsUrl(userId);

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
          pathname: getRoutePath(defaultViewPanels.error),
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
  }, [userId, routeNavigator]);

  const isLoading = loadingCount > 0;

  if (isLoading || statistics === null || achievements === null) {
    return <ScreenSpinner />;
  }

  return (
    <Panel id={id}>
      <AppHeader title={t("title.profile")} buttonType={AppHeaderButtonType.back} />
      <ProfileCover userPhoto={photo200} userFirstName={firstName} userLastName={lastName} />
      <StatisticsInfo statistics={statistics} />
      <ProfileAchievements userId={userId} achievements={achievements} />
    </Panel>
  );
};
