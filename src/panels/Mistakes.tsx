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

export const Mistakes: FC<NavIdProps> = ({ id }) => {
  const { t } = useTranslation();
  const routeNavigator = useRouteNavigator();

  const textPairs: [string, string][] = [
    ['apple1', 'apple1-back'],
    ['banana1', 'banana1-back'],
    ['cherry1', 'cherry1-back'],
    ['dog1', 'dog1-back'],
    ['cat1', 'cat1-back']
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
        {t("title.workOnMistakes")}
      </PanelHeader>

      <CardWithChoice textPairs={textPairs} />
    </Panel>
  );
};
