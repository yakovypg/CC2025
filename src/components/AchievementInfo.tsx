import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Achievement } from "../types";

export interface AchievementInfoProps {
  achievement: Achievement | null;
}

export const AchievementInfo: FC<AchievementInfoProps> = ({ achievement }) => {
  const { t } = useTranslation();

  return (
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
        {achievement ? achievement.nextLevelProgress - achievement.currentProgress : null}
      </h5>
    </div>
  );
};
