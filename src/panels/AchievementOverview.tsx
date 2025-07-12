import { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { NavIdProps, Panel, ScreenSpinner } from "@vkontakte/vkui";

import {
  useSearchParams,
  useRouteNavigator
} from "@vkontakte/vk-mini-apps-router";

import { ErrorType } from "../utils";
import { AppHeader } from "../components";
import { getUserAchievementUrl } from "../api";
import { getRoutePath, DEFAULT_VIEW_PANELS } from "../routes";
import { Achievement, AchievementModel, AppHeaderButtonType } from "../types";

import "../styles/icon.css";

export const AchievementOverview: FC<NavIdProps> = ({ id }) => {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const routeNavigator = useRouteNavigator();

  const userId = params.get("userId");
  const achievementIcon = params.get("icon");
  const achievementType = params.get("type");

  const [achievement, setAchievement] = useState<Achievement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let achievementData: Achievement | null = null;
    const url = getUserAchievementUrl(userId ?? "", achievementType ?? "");

    const loadData = async () => {
      try {
        const res = await fetch(url);
        achievementData = await res.json();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }

      achievementData = new AchievementModel();
      setAchievement(achievementData);

      if (achievementData === null) {
        routeNavigator.push({
          pathname: getRoutePath(DEFAULT_VIEW_PANELS.ERROR),
          search: {
            errorType: ErrorType.loadData
          }
        });
      }
    };

    loadData();
  }, [userId, achievementType, routeNavigator]);

  if (isLoading) {
    return <ScreenSpinner />;
  }

  return (
    <Panel id={id}>
      <AppHeader
        title={t("title.achievement")}
        buttonType={AppHeaderButtonType.closeBack}
      />

      <div className="container text-center mb-3">
        <i className={`${achievementIcon} mb-3 big-achievement-icon`}></i>
        <h5 className="fw-bold">
          {t(`achievement.${achievementType}.tooltip`)}
        </h5>
      </div>

      <div className="container text-center">
        <h5>
          {t("achievementPage.level")}: {achievement?.level}
        </h5>
        <h5>
          {t("achievementPage.hasMaxLevel")}:{" "}
          {achievement?.hasMaxLevel ? t("answer.yes") : t("answer.no")}
        </h5>
        <h5>
          {t("achievementPage.currentProgress")}: {achievement?.currentProgress}
        </h5>
        <h5>
          {t("achievementPage.remainingProgress")}:{" "}
          {achievement !== null
            ? achievement?.nextLevelProgress - achievement?.currentProgress
            : null}
        </h5>
      </div>
    </Panel>
  );
};
