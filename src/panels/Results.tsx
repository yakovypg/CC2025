import { useSearchParams } from "@vkontakte/vk-mini-apps-router";
import { NavIdProps, Panel } from "@vkontakte/vkui";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { AppHeader } from "../components";
import { AppHeaderButtonType } from "../types";

export const Results: FC<NavIdProps> = ({ id }) => {
  const { t } = useTranslation();
  const [params] = useSearchParams();

  const correctAnswersCount = params.get("correctAnswersCount") ?? 0;
  const incorrectAnswersCount = params.get("incorrectAnswersCount") ?? 0;

  return (
    <Panel id={id}>
      <AppHeader title={t("title.results")} buttonType={AppHeaderButtonType.close} />

      <div className="d-flex flex-column justify-content-center align-items-center text-center mt-4">
        <h3 className="mb-3">{t("title.results")}</h3>
        <h5>
          {t("resultsPage.correctAnswers")}: {correctAnswersCount}
        </h5>
        <h5>
          {t("resultsPage.incorrectAnswers")}: {incorrectAnswersCount}
        </h5>
      </div>
    </Panel>
  );
};
