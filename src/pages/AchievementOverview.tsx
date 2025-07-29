import { useSearchParams, useRouteNavigator, RouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { NavIdProps, Panel, ScreenSpinner } from "@vkontakte/vkui";
import { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { getUserAchievementsUrl } from "../api";
import { AppHeader, AchievementCover, AchievementInfo } from "../components";
import { IncorrectDataFormatError } from "../errors";
import { getRoutePath, DefaultViewPanels } from "../routes";
import { Achievement, Achievements, AppHeaderButtonType, isAchievements } from "../types";
import { ErrorType, isPageReloaded } from "../utils";

import "../styles/icon.css";

export const AchievementOverview: FC<NavIdProps> = ({ id }: NavIdProps) => {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const routeNavigator: RouteNavigator = useRouteNavigator();

  const userId: string = params.get("userId") ?? "";
  const achievementIcon: string = params.get("icon") ?? "";
  const achievementType: string = params.get("type") ?? "";

  const [achievement, setAchievement] = useState<Achievement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isPageReloaded()) {
      routeNavigator.push("/");
      return;
    }

    let achievement: Achievement | null = null;
    const url: string = getUserAchievementsUrl(userId);

    const loadData = async () => {
      try {
        const res: Response = await fetch(url);
        const achievementsData: unknown = await res.json();

        if (isAchievements(achievementsData) && achievementType in achievementsData) {
          achievement = achievementsData[achievementType as keyof Achievements];
        } else {
          throw new IncorrectDataFormatError("Recieved achievements has incorrect format");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }

      if (achievement === null) {
        routeNavigator.push({
          pathname: getRoutePath(DefaultViewPanels.ERROR),
          search: {
            errorType: ErrorType.LOAD_DATA
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
      <AppHeader title={t("title.achievement")} buttonType={AppHeaderButtonType.CLOSE_BACK} />
      <AchievementCover achievementIcon={achievementIcon} achievementType={achievementType} />
      <AchievementInfo achievement={achievement} />
    </Panel>
  );
};
