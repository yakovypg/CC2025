import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

import { getRoutePath, DEFAULT_VIEW_PANELS } from "../routes";

import "../styles/icon.css";
import "../styles/components/achievement-button.css";

export interface AchievementButtonProps {
  userId: string;
  achievementType: string;
  achievementLevel: number;
  achievementIcon: string;
}

export const AchievementButton: FC<AchievementButtonProps> = ({
  userId,
  achievementType,
  achievementLevel,
  achievementIcon
}) => {
  const { t } = useTranslation();
  const routeNavigator = useRouteNavigator();

  return (
    <button
      type="button"
      className="btn btn-outline-primary border-2 rounded-circle d-flex flex-column align-items-center justify-content-center achievement-btn"
      data-bs-toggle="tooltip"
      title={t(`achievement.${achievementType}.tooltip`)}
      onClick={() =>
        routeNavigator.push({
          pathname: getRoutePath(DEFAULT_VIEW_PANELS.ACHIEVEMENT),
          search: {
            userId: userId,
            icon: achievementIcon,
            type: achievementType
          }
        })
      }
    >
      <i className={`${achievementIcon} achievement-icon`}></i>
      <span className="achievement-level-text">{achievementLevel}</span>
    </button>
  );
};
