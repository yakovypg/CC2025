import { FC } from "react";
import { useTranslation } from "react-i18next";

import { NavIdProps, Panel } from "@vkontakte/vkui";

import { AppHeader } from "../components";
import { AppHeaderButtonType } from "../types";
import { CardWithChoice } from "../components/CardWithChoice";

export const Cards: FC<NavIdProps> = ({ id }) => {
  const { t } = useTranslation();

  const textPairs: [string, string][] = [
    ["apple", "apple-back"],
    ["banana", "banana-back"],
    ["cherry", "cherry-back"],
    ["dog", "dog-back"],
    ["cat", "cat-back"]
  ];

  return (
    <Panel id={id}>
      <AppHeader
        title={t("title.cards")}
        buttonType={AppHeaderButtonType.back}
      />
      <CardWithChoice textPairs={textPairs} />
    </Panel>
  );
};
