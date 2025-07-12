import { FC } from "react";
import { useTranslation } from "react-i18next";

import { NavIdProps, Panel } from "@vkontakte/vkui";

import { AppHeaderButtonType } from "../types";
import { AppHeader, CardWithChoice } from "../components";

export const Mistakes: FC<NavIdProps> = ({ id }) => {
  const { t } = useTranslation();

  const textPairs: [string, string][] = [
    ["apple1", "apple1-back"],
    ["banana1", "banana1-back"],
    ["cherry1", "cherry1-back"],
    ["dog1", "dog1-back"],
    ["cat1", "cat1-back"]
  ];

  return (
    <Panel id={id}>
      <AppHeader
        title={t("title.workOnMistakes")}
        buttonType={AppHeaderButtonType.back}
      />
      <CardWithChoice textPairs={textPairs} />
    </Panel>
  );
};
