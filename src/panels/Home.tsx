import { FC } from "react";
import { useTranslation } from "react-i18next";

import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Panel, NavIdProps } from "@vkontakte/vkui";

import { AppHeaderButtonType } from "../types";
import { AppHeader, HomeNavigationButton, ContactReferenceButton } from "../components";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const Home: FC<NavIdProps> = ({ id }) => {
  const { t } = useTranslation();
  const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <AppHeader title="CC 2025" buttonType={AppHeaderButtonType.none} />

      <div className="d-flex flex-column align-items-center">
        <HomeNavigationButton
          content={t("homePage.cards")}
          onClick={() => routeNavigator.push("cards")}
        />
        <HomeNavigationButton
          content={t("homePage.workOnMistakes")}
          onClick={() => routeNavigator.push("mistakes")}
        />
        <HomeNavigationButton
          content={t("homePage.profile")}
          onClick={() => routeNavigator.push("profile")}
        />
      </div>

      <div className="d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-center mb-3">
          <ContactReferenceButton href="https://vk.com" icon="fab fa-vk" />
          <ContactReferenceButton href="https://t.me" icon="fab fa-telegram-plane" />
          <ContactReferenceButton href="https://github.com" icon="fab fa-github" />
        </div>
      </div>
    </Panel>
  );
};
