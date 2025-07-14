import { FC } from "react";
import { useTranslation } from "react-i18next";

import "../styles/icon.css";

export interface AchievementCoverProps {
  achievementIcon: string;
  achievementType: string;
}

export const AchievementCover: FC<AchievementCoverProps> = ({
  achievementIcon,
  achievementType
}) => {
  const { t } = useTranslation();

  return (
    <div className="container text-center mb-3">
      <i className={`${achievementIcon} mb-3 big-achievement-icon`}></i>
      <h5 className="fw-bold">{t(`achievement.${achievementType}.tooltip`)}</h5>
    </div>
  );
};
