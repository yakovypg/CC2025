import { FC } from "react";
import { useTranslation } from "react-i18next";

import { useSearchParams } from "@vkontakte/vk-mini-apps-router";
import { NavIdProps, Panel } from "@vkontakte/vkui";

import { AppHeader } from "../components";
import { AppHeaderButtonType } from "../types";

export const Info: FC<NavIdProps> = ({ id }) => {
  const { t } = useTranslation();
  const [params] = useSearchParams();

  const text = params.get("text") ?? "";
  const subtext = params.get("subtext") ?? "";

  return (
    <Panel id={id}>
      <AppHeader title={t("title.info")} buttonType={AppHeaderButtonType.close} />

      <div className="d-flex flex-column justify-content-center align-items-center text-center mt-4">
        <h2>{t(text)}</h2>
        <h3 className="text-secondary">{t(subtext)}!</h3>
      </div>
    </Panel>
  );
};
