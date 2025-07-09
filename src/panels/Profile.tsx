import { FC } from "react";
import { useTranslation } from "react-i18next";

import {
  Avatar,
  Div,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  NavIdProps,
} from "@vkontakte/vkui";

import { UserInfo } from "@vkontakte/vk-bridge";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { calcInitialsAvatarColor } from "@vkontakte/vkui";

import { changeLanguage } from "../utils/i18n";
import { Statistics, Achievements } from "../types";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "../styles/profile.css";

export interface ProfileProps extends NavIdProps {
  user?: UserInfo;
  statistics: Statistics;
  achievements: Achievements;
}

export const Profile: FC<ProfileProps> = ({
  id,
  user,
  statistics,
  achievements,
}) => {
  const { t } = useTranslation();
  const routeNavigator = useRouteNavigator();

  const { photo_200 } = { ...user };
  let { first_name, last_name } = { ...user };

  first_name ??= t("profile.user");
  last_name ??= "1";

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}
        after={
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm mx-2"
            onClick={changeLanguage}
          >
            {t("shortName")}
          </button>
        }
      >
        {t("title.profile")}
      </PanelHeader>

      <Div className="d-flex flex-column align-items-center gap-2">
        <Avatar
          src={photo_200 ?? undefined}
          size={128}
          initials="U"
          gradientColor={calcInitialsAvatarColor(4)}
          alt="Avatar"
        />
        <h6 className="fs-5 fw-bold">
          {first_name} {last_name}
        </h6>
      </Div>

      <Div className="container text-center">
        <h5>
          {t("profile.correctAnswers")}: {statistics.correctAnswers}
        </h5>
        <h5>
          {t("profile.incorrectAnswers")}: {statistics.incorrectAnswers}
        </h5>
        <h5>
          {t("profile.bestSeries")}: {statistics.bestSeries}
        </h5>
        <h5>
          {t("profile.strike")}: {statistics.strikeCounter}
        </h5>
      </Div>

      <Div className="container text-center">
        <h5 className="mt-5">{t("profile.achievements")}</h5>

        <Div className="d-flex justify-content-center gap-3">
          <button
            type="button"
            className="btn btn-outline-primary border-2 rounded-circle d-flex flex-column align-items-center justify-content-center achievement-btn"
            data-bs-toggle="tooltip"
            title={t("achievement.daysInStrike.tooltip")}
          >
            <i className="fas fa-trophy fa-2x achievement-icon"></i>
            <span className="achievement-level-text">
              {achievements.daysInStrikeLevel}
            </span>
          </button>
          <button
            type="button"
            className="btn btn-outline-primary border-2 rounded-circle d-flex flex-column align-items-center justify-content-center achievement-btn"
            data-bs-toggle="tooltip"
            title={t("achievement.rightAnswers.tooltip")}
          >
            <i className="fas fa-check-circle fa-2x achievement-icon"></i>
            <span className="achievement-level-text">
              {achievements.rightAnswersLevel}
            </span>
          </button>
          <button
            type="button"
            className="btn btn-outline-primary border-2 rounded-circle d-flex flex-column align-items-center justify-content-center achievement-btn"
            data-bs-toggle="tooltip"
            title={t("achievement.perfectSeries.tooltip")}
          >
            <i className="fas fa-star fa-2x achievement-icon"></i>
            <span className="achievement-level-text">
              {achievements.perfectSeriesLevel}
            </span>
          </button>
          <button
            type="button"
            className="btn btn-outline-primary border-2 rounded-circle d-flex flex-column align-items-center justify-content-center achievement-btn"
            data-bs-toggle="tooltip"
            title={t("achievement.veteran.tooltip")}
          >
            <i className="fas fa-medal fa-2x achievement-icon"></i>
            <span className="achievement-level-text">
              {achievements.veteranLevel}
            </span>
          </button>
        </Div>
      </Div>
    </Panel>
  );
};
