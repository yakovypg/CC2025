import { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { NavIdProps, Panel, ScreenSpinner } from "@vkontakte/vkui";
import { useSearchParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

import { ErrorType } from "../utils";
import { AppHeader, AchievementCover, AchievementInfo } from "../components";
import { getUserAchievementsUrl } from "../api";
import { getRoutePath, DEFAULT_VIEW_PANELS } from "../routes";
import { Achievement, AppHeaderButtonType } from "../types";

import "../styles/icon.css";

export const AchievementOverview: FC<NavIdProps> = ({ id }) => {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const routeNavigator = useRouteNavigator();

  const userId = params.get("userId") ?? "";
  const achievementIcon = params.get("icon") ?? "";
  const achievementType = params.get("type") ?? "";

  const [achievement, setAchievement] = useState<Achievement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let achievement: Achievement | null = null;
    const url = getUserAchievementsUrl(userId);

    const loadData = async () => {
      try {
        const res = await fetch(url);
        const achievementsData = await res.json();
        achievement = achievementsData[achievementType];
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }

      if (achievement === null) {
        routeNavigator.push({
          pathname: getRoutePath(DEFAULT_VIEW_PANELS.ERROR),
          search: {
            errorType: ErrorType.loadData
          }
        });
      } else {
        setAchievement(achievement);
      }
    };

    loadData();
  }, [userId, achievementType, routeNavigator]);

  if (isLoading) {
    return <ScreenSpinner />;
  }

  return (
    <Panel id={id}>
      <AppHeader title={t("title.achievement")} buttonType={AppHeaderButtonType.closeBack} />

      <AchievementCover achievementIcon={achievementIcon} achievementType={achievementType} />

      <AchievementInfo achievement={achievement} />
    </Panel>
  );
};
