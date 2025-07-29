import { RouteNavigator, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { NavIdProps, Panel, ScreenSpinner } from "@vkontakte/vkui";
import { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { getCardsUrl } from "../api";
import { AppHeader } from "../components";
import { CardWithChoice } from "../components/CardWithChoice";
import { CARDS_COUNT_IN_SESSION } from "../config";
import { UserContext, useUser } from "../contexts";
import { DefaultViewPanels, getRoutePath } from "../routes";
import { AppHeaderButtonType, Card } from "../types";
import { ErrorType } from "../utils";

export const Cards: FC<NavIdProps> = ({ id }: NavIdProps) => {
  const { t } = useTranslation();
  const routeNavigator: RouteNavigator = useRouteNavigator();
  const userContext: UserContext = useUser();

  const [cards, setCards] = useState<Card[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (userContext.user === undefined) {
      routeNavigator.push("/");
      return;
    }

    const loadData = async () => {
      let cardsData: Card[] | null = null;
      const statisticsUrl: string = getCardsUrl(CARDS_COUNT_IN_SESSION);

      try {
        const res: Response = await fetch(statisticsUrl);
        cardsData = await res.json();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }

      if (cardsData === null) {
        routeNavigator.push({
          pathname: getRoutePath(DefaultViewPanels.ERROR),
          search: {
            errorType: ErrorType.LOAD_DATA
          }
        });
      } else {
        setCards(cardsData);
      }
    };

    loadData();
  }, []);

  if (isLoading || cards === null || userContext.user === undefined) {
    return <ScreenSpinner />;
  }

  return (
    <Panel id={id}>
      <AppHeader title={t("title.cards")} buttonType={AppHeaderButtonType.BACK} />
      <CardWithChoice userId={userContext.user.id} cards={cards} />
    </Panel>
  );
};
