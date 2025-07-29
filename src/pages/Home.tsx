import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { Panel, NavIdProps } from "@vkontakte/vkui";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { AppHeader, HomeNavigationButton, ContactReferenceButton } from "../components";
import { DefaultViewPanels } from "../routes";
import { AppHeaderButtonType } from "../types";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const Home: FC<NavIdProps> = ({ id }) => {
  const { t } = useTranslation();
  const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <AppHeader title="CC 2025" buttonType={AppHeaderButtonType.NONE} />

      <div className="d-flex flex-column align-items-center mt-4">
        <HomeNavigationButton
          content={t("homePage.cards")}
          onClick={() => routeNavigator.push(DefaultViewPanels.CARDS)}
        />
        <HomeNavigationButton
          content={t("homePage.workOnMistakes")}
          onClick={() => routeNavigator.push(DefaultViewPanels.MISTAKES)}
        />
        <HomeNavigationButton
          content={t("homePage.profile")}
          onClick={() => routeNavigator.push(DefaultViewPanels.PROFILE)}
        />
      </div>

      <div className="d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-center mb-3">
          <ContactReferenceButton href="https://vk.com/y_chemistry" icon="fab fa-vk" />
          <ContactReferenceButton
            href="https://t.me/chemistry_cards"
            icon="fab fa-telegram-plane"
          />
          <ContactReferenceButton href="https://github.com/yakovypg/CC2025" icon="fab fa-github" />
        </div>
      </div>
    </Panel>
  );
};
