import { FC } from "react";
import { useTranslation } from "react-i18next";

import {
  useRouteNavigator,
  useSearchParams
} from "@vkontakte/vk-mini-apps-router";

import {
  NavIdProps,
  Panel,
  PanelHeader,
  PanelHeaderClose
} from "@vkontakte/vkui";

import { changeLanguage, getErrorMessage, ErrorType } from "../utils";

export const Error: FC<NavIdProps> = ({ id }) => {
  const { t } = useTranslation();
  const routeNavigator = useRouteNavigator();
  const [params] = useSearchParams();

  const errorType = params.get("errorType") ?? ErrorType.internal;
  const errorMessage = getErrorMessage(errorType, t);

  return (
    <Panel id={id}>
      <PanelHeader
        before={
          <PanelHeaderClose onClick={() => routeNavigator.backToFirst()} />
        }
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
        {t("title.error")}
      </PanelHeader>

      <div className="d-flex flex-column justify-content-center align-items-center text-center mt-4">
        <h2>{t("title.error")}</h2>
        <h3 className="text-secondary">{errorMessage}</h3>
      </div>
    </Panel>
  );
};
