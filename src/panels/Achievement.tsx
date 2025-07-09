import { FC } from "react";
import { useTranslation } from "react-i18next";

import {
  Div,
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderClose,
} from "@vkontakte/vkui";

import {
  useRouteNavigator,
  useSearchParams,
} from "@vkontakte/vk-mini-apps-router";

import { changeLanguage } from "../utils/i18n";

import "../styles/achievement.css";

export const Achievement: FC<NavIdProps> = ({ id }) => {
  const { t } = useTranslation();
  const routeNavigator = useRouteNavigator();

  const [params, setParams] = useSearchParams();
  const userId = params.get("userId");
  const icon = params.get("icon");
  const achievement = params.get("achievement");

  const [level, hasMaxLevel, currentProgress, remainingProgress] = [
    1,
    true,
    1,
    1,
  ];

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderClose onClick={() => routeNavigator.back()} />}
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
        {t("title.achievement")}
      </PanelHeader>

      <Div className="container text-center mb-3">
        <i className={`${icon} mb-3 icon`}></i>
        <h5 className="fw-bold">{t(`achievement.${achievement}.tooltip`)}</h5>
      </Div>

      <Div className="container text-center">
        <h5>
          {t("achievementPage.level")}: {level}
        </h5>
        <h5>
          {t("achievementPage.hasMaxLevel")}:{" "}
          {hasMaxLevel ? t("answer.yes") : t("answer.no")}
        </h5>
        <h5>
          {t("achievementPage.currentProgress")}: {currentProgress}
        </h5>
        <h5>
          {t("achievementPage.remainingProgress")}: {remainingProgress}
        </h5>
      </Div>
    </Panel>
  );
};
