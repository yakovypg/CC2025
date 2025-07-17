import { FC } from "react";
import { useTranslation } from "react-i18next";

import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { PanelHeader, PanelHeaderBack, PanelHeaderClose } from "@vkontakte/vkui";

import { changeLanguage } from "../utils";
import { AppHeaderButtonType } from "../types";

import "../styles/components/card.css";

export interface AppHeaderProps {
  title: string;
  buttonType: AppHeaderButtonType;
}

export const AppHeader: FC<AppHeaderProps> = ({ title, buttonType }) => {
  const { t } = useTranslation();
  const routeNavigator = useRouteNavigator();

  const button =
    buttonType === AppHeaderButtonType.back ? (
      <PanelHeaderBack onClick={() => routeNavigator.back()} />
    ) : buttonType === AppHeaderButtonType.close ? (
      <PanelHeaderClose onClick={() => routeNavigator.backToFirst()} />
    ) : buttonType === AppHeaderButtonType.closeBack ? (
      <PanelHeaderClose onClick={() => routeNavigator.back()} />
    ) : undefined;

  return (
    <PanelHeader
      before={button}
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
      {title}
    </PanelHeader>
  );
};
