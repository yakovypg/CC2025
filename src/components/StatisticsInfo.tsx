import { FC } from "react";
import { useTranslation } from "react-i18next";

import { Statistics } from "../types";

export interface StatisticsInfoProps {
  statistics: Statistics;
}

export const StatisticsInfo: FC<StatisticsInfoProps> = ({ statistics }) => {
  const { t } = useTranslation();

  return (
    <div className="container text-center">
      <h5>
        {t("profilePage.correctAnswers")}:{" "}
        {statistics?.correctAnswers ?? "Error"}
      </h5>
      <h5>
        {t("profilePage.incorrectAnswers")}: {statistics.incorrectAnswers}
      </h5>
      <h5>
        {t("profilePage.bestSeries")}: {statistics.bestSeries}
      </h5>
      <h5>
        {t("profilePage.strike")}: {statistics.strikeCounter}
      </h5>
    </div>
  );
};
