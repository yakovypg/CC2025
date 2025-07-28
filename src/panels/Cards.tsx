import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { NavIdProps, Panel, ScreenSpinner } from "@vkontakte/vkui";
import { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { getCardsUrl } from "../api";
import { AppHeader } from "../components";
import { CardWithChoice } from "../components/CardWithChoice";
import { useUser } from "../contexts";
import { defaultViewPanels, getRoutePath } from "../routes";
import { AppHeaderButtonType, Card } from "../types";
import { ErrorType } from "../utils";

const defaultCardsCount = 5;

export const Cards: FC<NavIdProps> = ({ id }) => {
  const { t } = useTranslation();
  const routeNavigator = useRouteNavigator();
  const userContext = useUser();

  const [cards, setCards] = useState<Card[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!userContext.user) {
      routeNavigator.push("/");
      return;
    }

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
  }, []);

  if (isLoading || cards === null || !userContext.user) {
    return <ScreenSpinner />;
  }

  return (
    <Panel id={id}>
      <AppHeader title={t("title.cards")} buttonType={AppHeaderButtonType.back} />
      <CardWithChoice userId={userContext.user.id} cards={cards} />
    </Panel>
  );
};
