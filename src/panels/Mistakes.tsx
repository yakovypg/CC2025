import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { NavIdProps, Panel, ScreenSpinner } from "@vkontakte/vkui";
import { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { getCardsByIdsUrl, getUserMistakesUrl } from "../api";
import { AppHeader, CardWithChoice } from "../components";
import { useUser } from "../contexts";
import { DefaultViewPanels, getRoutePath } from "../routes";
import { AppHeaderButtonType, Card } from "../types";
import { ErrorType } from "../utils";

export const Mistakes: FC<NavIdProps> = ({ id }) => {
  const { t } = useTranslation();
  const routeNavigator = useRouteNavigator();
  const userContext = useUser();

  const [mistakeIds, setMistakeIds] = useState<number[] | null>(null);
  const [cards, setCards] = useState<Card[] | null>(null);
  const [loadingCount, setLoadingCount] = useState<number>(0);

  useEffect(() => {
    if (userContext.user === undefined) {
      routeNavigator.push("/");
      return;
    }

    const userId = userContext.user.id;

    const incrementLoading = () => setLoadingCount((count) => count + 1);
    const decrementLoading = () => setLoadingCount((count) => Math.max(count - 1, 0));

    const loadData = async () => {
      let mistakeIdsData: number[] | null = null;
      let cardsData: Card[] | null = null;

      incrementLoading();

      try {
        const mistakesUrl = getUserMistakesUrl(userId);
        const res = await fetch(mistakesUrl);
        mistakeIdsData = await res.json();
      } catch (error) {
        console.log(error);
      } finally {
        decrementLoading();
      }

      if (mistakeIdsData?.length === 0) {
        routeNavigator.push({
          pathname: getRoutePath(DefaultViewPanels.INFO),
          search: {
            text: "message.noErrors",
            subtext: "message.keepItUp"
          }
        });
      }

      if (mistakeIdsData) {
        incrementLoading();

        try {
          const cardsUrl = getCardsByIdsUrl(mistakeIdsData);
          const res = await fetch(cardsUrl);
          cardsData = await res.json();
        } catch (error) {
          console.log(error);
        } finally {
          decrementLoading();
        }
      }

      if (mistakeIdsData === null || cardsData === null) {
        routeNavigator.push({
          pathname: getRoutePath(DefaultViewPanels.ERROR),
          search: {
            errorType: ErrorType.LOAD_DATA
          }
        });
      } else {
        setMistakeIds(mistakeIdsData);
        setCards(cardsData);
      }
    };

    loadData();
  }, []);

  const isLoading = loadingCount > 0;

  if (
    isLoading ||
    mistakeIds === null ||
    cards === null ||
    mistakeIds.length === 0 ||
    cards.length === 0 ||
    userContext.user === undefined
  ) {
    return <ScreenSpinner />;
  }

  return (
    <Panel id={id}>
      <AppHeader title={t("title.workOnMistakes")} buttonType={AppHeaderButtonType.BACK} />
      <CardWithChoice userId={userContext.user.id} cards={cards} />
    </Panel>
  );
};
