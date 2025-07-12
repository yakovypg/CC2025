import { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import {
  Avatar,
  Panel,
  NavIdProps,
  ScreenSpinner,
  calcInitialsAvatarColor
} from "@vkontakte/vkui";

import { UserInfo } from "@vkontakte/vk-bridge";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

import { ErrorType } from "../utils";
import { AppHeader } from "../components";
import { AppHeaderButtonType } from "../types";
import { getRoutePath, DEFAULT_VIEW_PANELS } from "../routes";
import { getUserAchievementsUrl, getUserStatisticsUrl } from "../api";

import {
  Statistics,
  StatisticsModel,
  Achievements,
  AchievementsModel
} from "../types";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "../styles/icon.css";
import "../styles/profile.css";

export interface ProfileProps extends NavIdProps {
  user?: UserInfo;
}

export const Profile: FC<ProfileProps> = ({ id, user }) => {
  const { t } = useTranslation();
  const routeNavigator = useRouteNavigator();

  const user_id = user?.id.toString() ?? "";
  const first_name = user?.first_name ?? t("profilePage.user");
  const last_name = user?.last_name ?? "1";
  const photo_200 = user?.photo_200;

  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [achievements, setAchievements] = useState<Achievements | null>(null);
  const [loadingCount, setLoadingCount] = useState<number>(0);

  useEffect(() => {
    const incrementLoading = () => setLoadingCount((count) => count + 1);

    const decrementLoading = () =>
      setLoadingCount((count) => Math.max(count - 1, 0));

    const loadData = async () => {
      let statisticsData: StatisticsModel | null = null;
      let achievementsData: AchievementsModel | null = null;

      const statisticsUrl = getUserStatisticsUrl(user_id);
      const achievementsUrl = getUserAchievementsUrl(user_id);

      incrementLoading();

      try {
        const res = await fetch(statisticsUrl);
        statisticsData = await res.json();
      } catch (error) {
        console.log(error);
      } finally {
        decrementLoading();
      }

      incrementLoading();

      try {
        const res = await fetch(achievementsUrl);
        achievementsData = await res.json();
      } catch (error) {
        console.log(error);
      } finally {
        decrementLoading();
      }

      statisticsData = new StatisticsModel();
      achievementsData = new AchievementsModel();

      setStatistics(statisticsData);
      setAchievements(achievementsData);

      if (statisticsData === null || achievementsData === null) {
        routeNavigator.push({
          pathname: getRoutePath(DEFAULT_VIEW_PANELS.ERROR),
          search: {
            errorType: ErrorType.loadData
          }
        });
      }
    };

    loadData();
  }, [user_id, routeNavigator]);

  const isLoading = loadingCount > 0;

  if (isLoading || statistics === null || achievements === null) {
    return <ScreenSpinner />;
  }

  return (
    <Panel id={id}>
      <AppHeader
        title={t("title.profile")}
        buttonType={AppHeaderButtonType.back}
      />

      <div className="d-flex flex-column align-items-center gap-2">
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
      </div>

      <div className="container text-center">
        <h5>
          {t("profilePage.correctAnswers")}:{" "}
          {statistics?.correctAnswers ?? "Error"}
        </h5>
        <h5>
          {t("profilePage.incorrectAnswers")}: {statistics?.incorrectAnswers}
        </h5>
        <h5>
          {t("profilePage.bestSeries")}: {statistics?.bestSeries}
        </h5>
        <h5>
          {t("profilePage.strike")}: {statistics?.strikeCounter}
        </h5>
      </div>

      <div className="container text-center">
        <h5 className="mt-5">{t("profilePage.achievements")}</h5>

        <div className="d-flex justify-content-center gap-3">
          <button
            type="button"
            className="btn btn-outline-primary border-2 rounded-circle d-flex flex-column align-items-center justify-content-center achievement-btn"
            data-bs-toggle="tooltip"
            title={t("achievement.daysInStrike.tooltip")}
            onClick={() =>
              routeNavigator.push({
                pathname: getRoutePath(DEFAULT_VIEW_PANELS.ACHIEVEMENT),
                search: {
                  userId: user_id,
                  icon: "fas fa-trophy",
                  type: "daysInStrike"
                }
              })
            }
          >
            <i className="fas fa-trophy achievement-icon"></i>
            <span className="achievement-level-text">
              {achievements?.daysInStrike.level}
            </span>
          </button>
          <button
            type="button"
            className="btn btn-outline-primary border-2 rounded-circle d-flex flex-column align-items-center justify-content-center achievement-btn"
            data-bs-toggle="tooltip"
            title={t("achievement.rightAnswers.tooltip")}
            onClick={() =>
              routeNavigator.push({
                pathname: getRoutePath(DEFAULT_VIEW_PANELS.ACHIEVEMENT),
                search: {
                  userId: user_id,
                  icon: "fas fa-check-circle",
                  type: "rightAnswers"
                }
              })
            }
          >
            <i className="fas fa-check-circle achievement-icon"></i>
            <span className="achievement-level-text">
              {achievements?.rightAnswers.level}
            </span>
          </button>
          <button
            type="button"
            className="btn btn-outline-primary border-2 rounded-circle d-flex flex-column align-items-center justify-content-center achievement-btn"
            data-bs-toggle="tooltip"
            title={t("achievement.perfectSeries.tooltip")}
            onClick={() =>
              routeNavigator.push({
                pathname: getRoutePath(DEFAULT_VIEW_PANELS.ACHIEVEMENT),
                search: {
                  userId: user_id,
                  icon: "fas fa-star",
                  type: "perfectSeries"
                }
              })
            }
          >
            <i className="fas fa-star achievement-icon"></i>
            <span className="achievement-level-text">
              {achievements?.perfectSeries.level}
            </span>
          </button>
          <button
            type="button"
            className="btn btn-outline-primary border-2 rounded-circle d-flex flex-column align-items-center justify-content-center achievement-btn"
            data-bs-toggle="tooltip"
            title={t("achievement.veteran.tooltip")}
            onClick={() =>
              routeNavigator.push({
                pathname: getRoutePath(DEFAULT_VIEW_PANELS.ACHIEVEMENT),
                search: {
                  userId: user_id,
                  icon: "fas fa-medal",
                  type: "veteran"
                }
              })
            }
          >
            <i className="fas fa-medal achievement-icon"></i>
            <span className="achievement-level-text">
              {achievements?.veteran.level}
            </span>
          </button>
        </div>
      </div>
    </Panel>
  );
};
