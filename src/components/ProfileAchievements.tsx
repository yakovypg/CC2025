import { FC } from "react";
import { useTranslation } from "react-i18next";

import { AchievementButton } from "../components";
import { Achievements } from "../types";

export interface ProfileAchievementsProps {
  userId: string;
  achievements: Achievements;
}

export const ProfileAchievements: FC<ProfileAchievementsProps> = ({ userId, achievements }) => {
  const { t } = useTranslation();

  return (
    <div className="container text-center mt-5">
      <h5 className="mb-3">{t("profilePage.achievements")}</h5>

      <div className="d-flex justify-content-center gap-3">
        <AchievementButton
          userId={userId}
          achievementType="daysInStrike"
          achievementLevel={achievements.daysInStrike.level}
          achievementIcon="fas fa-trophy"
        />

        <AchievementButton
          userId={userId}
          achievementType="rightAnswers"
          achievementLevel={achievements.rightAnswers.level}
          achievementIcon="fas fa-check-circle"
        />

        <AchievementButton
          userId={userId}
          achievementType="perfectSeries"
          achievementLevel={achievements.perfectSeries.level}
          achievementIcon="fas fa-star"
        />

        <AchievementButton
          userId={userId}
          achievementType="veteran"
          achievementLevel={achievements.veteran.level}
          achievementIcon="fas fa-medal"
        />
      </div>
    </div>
  );
};
