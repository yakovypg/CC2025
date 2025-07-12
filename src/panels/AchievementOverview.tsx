import { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Div, NavIdProps, Panel, ScreenSpinner } from "@vkontakte/vkui";
import { useSearchParams } from "@vkontakte/vk-mini-apps-router";

import { AppHeader } from "../components";
import { getUserAchievementUrl } from "../api/urls";
import { Achievement, AppHeaderButtonType } from "../types";

import "../styles/icon.css";

export const AchievementOverview: FC<NavIdProps> = ({ id }) => {
  const { t } = useTranslation();

  const [params] = useSearchParams();
  const userId = params.get("userId");
  const achievementIcon = params.get("icon");
  const achievementType = params.get("type");

  const [achievement, setAchievement] = useState<Achievement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const url = getUserAchievementUrl(userId ?? "", achievementType ?? "");

    fetch(url)
      .then((res) => res.json())
      .then((data) => setAchievement(data))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [userId, achievementType]);

  if (isLoading) {
    return <ScreenSpinner />;
  }

  return (
    <Panel id={id}>
      <AppHeader
        title={t("title.achievement")}
        buttonType={AppHeaderButtonType.closeBack}
      />

      <Div className="container text-center mb-3">
        <i className={`${achievementIcon} mb-3 achievement-icon`}></i>
        <h5 className="fw-bold">
          {t(`achievement.${achievementType}.tooltip`)}
        </h5>
      </Div>

      <Div className="container text-center">
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
      </Div>
    </Panel>
  );
};
