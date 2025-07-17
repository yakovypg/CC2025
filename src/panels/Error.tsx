import { FC } from "react";
import { useTranslation } from "react-i18next";

import { useSearchParams } from "@vkontakte/vk-mini-apps-router";
import { NavIdProps, Panel } from "@vkontakte/vkui";

import { AppHeader } from "../components";
import { AppHeaderButtonType } from "../types";
import { getErrorMessage, ErrorType } from "../utils";

export const Error: FC<NavIdProps> = ({ id }) => {
  const { t } = useTranslation();
  const [params] = useSearchParams();

  const errorType = params.get("errorType") ?? ErrorType.internal;
  const errorMessage = getErrorMessage(errorType, t);

  return (
    <Panel id={id}>
      <AppHeader title={t("title.error")} buttonType={AppHeaderButtonType.close} />

      <div className="d-flex flex-column justify-content-center align-items-center text-center mt-4">
        <h2>{t("title.error")}</h2>
        <h3 className="text-secondary">{errorMessage}</h3>
      </div>
    </Panel>
  );
};
