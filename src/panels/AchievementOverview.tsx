import { useSearchParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { NavIdProps, Panel, ScreenSpinner } from "@vkontakte/vkui";
import { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { getUserAchievementsUrl } from "../api";
import { AppHeader, AchievementCover, AchievementInfo } from "../components";
import { getRoutePath, defaultViewPanels } from "../routes";
import { Achievement, AppHeaderButtonType } from "../types";
import { ErrorType } from "../utils";

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
          pathname: getRoutePath(defaultViewPanels.error),
          search: {
            errorType: ErrorType.loadData
          }
        });
      } else {
        setAchievement(achievement);
      }
    };

    loadData();
  }, []);

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
