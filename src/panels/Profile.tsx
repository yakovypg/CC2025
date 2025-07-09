import { FC, useState, useEffect } from "react";
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
import { ScreenSpinner, calcInitialsAvatarColor } from "@vkontakte/vkui";

import { changeLanguage } from "../utils/i18n";
import { Statistics, Achievements } from "../types";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

//import bridge from "@vkontakte/vk-bridge";

import "../styles/profile.css";

export const Profile: FC<NavIdProps> = ({ id }) => {
  const { t } = useTranslation();
  const routeNavigator = useRouteNavigator();

  const [user, setUser] = useState<UserInfo | undefined>();
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [achievements, setAchievements] = useState<Achievements | null>(null);
  const [loadingCount, setLoadingCount] = useState(0);

  useEffect(() => {
    const incrementLoading = () => setLoadingCount((count) => count + 1);
    const decrementLoading = () =>
      setLoadingCount((count) => Math.max(count - 1, 0));

    // incrementLoading();
    // bridge
    //   .send("VKWebAppGetUserInfo")
    //   .then((data) => setUser(data))
    //   .catch(console.error)
    //   .finally(() => decrementLoading());

    incrementLoading();
    fetch("http://localhost:8080/user/123/statistic")
      .then((res) => res.json())
      .then((data) => setStatistics(data))
      .catch(console.error)
      .finally(() => decrementLoading());

    incrementLoading();
    fetch("http://localhost:8080/user/123/achievement")
      .then((res) => res.json())
      .then((data) => setAchievements(data))
      .catch(console.error)
      .finally(() => decrementLoading());
  }, []);

  const isLoading = loadingCount > 0;

  if (isLoading) {
    return <ScreenSpinner />;
  }

  let { photo_200, first_name, last_name } = { ...user };

  photo_200 ??= undefined;
  first_name ??= t("profile.user");
  last_name ??= "1";

  if (statistics === null) {
    setStatistics({
      correctAnswers: 0,
      incorrectAnswers: 0,
      bestSeries: 0,
      strikeCounter: 0
    });
  }

  if (achievements === null) {
    setAchievements({
      daysInStrikeLevel: 0,
      rightAnswersLevel: 0,
      perfectSeriesLevel: 0,
      veteranLevel: 0
    });
  }

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
          src={photo_200}
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
          {t("profile.correctAnswers")}: {statistics?.correctAnswers}
        </h5>
        <h5>
          {t("profile.incorrectAnswers")}: {statistics?.incorrectAnswers}
        </h5>
        <h5>
          {t("profile.bestSeries")}: {statistics?.bestSeries}
        </h5>
        <h5>
          {t("profile.strike")}: {statistics?.strikeCounter}
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
              {achievements?.daysInStrikeLevel}
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
              {achievements?.rightAnswersLevel}
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
              {achievements?.perfectSeriesLevel}
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
              {achievements?.veteranLevel}
            </span>
          </button>
        </Div>
      </Div>
    </Panel>
  );
};
