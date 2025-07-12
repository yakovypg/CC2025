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
import { CardWithChoice } from "../components/CardWithChoice";

export const Cards: FC<NavIdProps> = ({ id }) => {
  const { t } = useTranslation();
  const routeNavigator = useRouteNavigator();

  const textPairs: [string, string][] = [
    ['apple', 'apple-back'],
    ['banana', 'banana-back'],
    ['cherry', 'cherry-back'],
    ['dog', 'dog-back'],
    ['cat', 'cat-back']
  ];

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

      <CardWithChoice textPairs={textPairs} />
    </Panel>
  );
};
