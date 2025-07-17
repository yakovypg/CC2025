import { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { NavIdProps, Panel, ScreenSpinner } from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

import { AppHeader } from "../components";
import { AppHeaderButtonType, Card } from "../types";
import { CardWithChoice } from "../components/CardWithChoice";
import { defaultViewPanels, getRoutePath } from "../routes";
import { ErrorType } from "../utils";
import { getCardsUrl } from "../api";

const defaultCardsCount = 5;

export const Cards: FC<NavIdProps> = ({ id }) => {
  const { t } = useTranslation();
  const routeNavigator = useRouteNavigator();

  const [cards, setCards] = useState<Card[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      let cardsData: Card[] | null = null;
      const statisticsUrl = getCardsUrl(defaultCardsCount);

      try {
        const res = await fetch(statisticsUrl);
        cardsData = await res.json();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }

      if (cardsData === null) {
        routeNavigator.push({
          pathname: getRoutePath(defaultViewPanels.error),
          search: {
            errorType: ErrorType.loadData
          }
        });
      } else {
        setCards(cardsData);
      }
    };

    loadData();
  }, [routeNavigator]);

  if (isLoading || cards === null) {
    return <ScreenSpinner />;
  }

  return (
    <Panel id={id}>
      <AppHeader title={t("title.cards")} buttonType={AppHeaderButtonType.back} />
      <CardWithChoice cards={cards} />
    </Panel>
  );
};
