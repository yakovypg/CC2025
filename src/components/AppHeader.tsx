import { RouteNavigator, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { PanelHeader, PanelHeaderBack, PanelHeaderClose } from "@vkontakte/vkui";
import { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { AppHeaderButtonType } from "../types";
import { changeLanguage } from "../utils";

import "../styles/components/card.css";
import "../styles/text.css";

export interface AppHeaderProps {
  title: string;
  buttonType: AppHeaderButtonType;
}

export const AppHeader: FC<AppHeaderProps> = ({ title, buttonType }: AppHeaderProps) => {
  const { t } = useTranslation();
  const routeNavigator: RouteNavigator = useRouteNavigator();

  const button: ReactNode =
    buttonType === AppHeaderButtonType.BACK ? (
      <PanelHeaderBack onClick={() => routeNavigator.back()} />
    ) : buttonType === AppHeaderButtonType.CLOSE ? (
      <PanelHeaderClose onClick={() => routeNavigator.push("/")} />
    ) : buttonType === AppHeaderButtonType.CLOSE_BACK ? (
      <PanelHeaderClose onClick={() => routeNavigator.back()} />
    ) : undefined;

  return (
    <PanelHeader
      before={button}
      after={
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm mx-2"
          onClick={changeLanguage}>
          {t("shortName")}
        </button>
      }>
      <div className="d-flex align-items-center justify-content-center">
        <p className="fs-6 fw-bold mb-0 centered-entire-width">{title}</p>
      </div>
    </PanelHeader>
  );
};
