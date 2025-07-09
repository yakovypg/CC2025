import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Panel, PanelHeader, Button, Div, NavIdProps } from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

import { changeLanguage } from "../utils/i18n";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/home.css";

export const Home: FC<NavIdProps> = ({ id }) => {
  const { t } = useTranslation();
  const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader
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
        CC 2025
      </PanelHeader>

      <Div className="d-flex flex-column align-items-center">
        <Button
          className="mb-4 home-menu-btn"
          size="l"
          mode="outline"
          onClick={() => routeNavigator.push("cards")}
        >
          {t("homePage.cards")}
        </Button>
        <Button
          className="mb-4 home-menu-btn"
          size="l"
          mode="outline"
          onClick={() => routeNavigator.push("mistakes")}
        >
          {t("homePage.workOnMistakes")}
        </Button>
        <Button
          className="mb-4 home-menu-btn"
          size="l"
          mode="outline"
          onClick={() => routeNavigator.push("profile")}
        >
          {t("homePage.profile")}
        </Button>
      </Div>

      <Div className="d-flex flex-column justify-content-between">
        <Div className="d-flex justify-content-center mb-3">
          <a href="https://vk.com" target="_blank" rel="noopener noreferrer">
            <Button className="mx-2" size="l" mode="tertiary">
              <i className="fab fa-vk contact-icon"></i>
            </Button>
          </a>
          <a href="https://t.me" target="_blank" rel="noopener noreferrer">
            <Button className="mx-2" size="l" mode="tertiary">
              <i className="fab fa-telegram-plane contact-icon"></i>
            </Button>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="mx-2" size="l" mode="tertiary">
              <i className="fab fa-github contact-icon"></i>
            </Button>
          </a>
        </Div>
      </Div>
    </Panel>
  );
};
