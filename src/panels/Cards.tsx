import { FC } from "react";
import { useTranslation } from "react-i18next";

import {
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderBack
} from "@vkontakte/vkui";

import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { changeLanguage } from "../utils/i18n";

export const Cards: FC<NavIdProps> = ({ id }) => {
  const { t } = useTranslation();
  const routeNavigator = useRouteNavigator();

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
        {t("title.cards")}
      </PanelHeader>
    </Panel>
  );
};
