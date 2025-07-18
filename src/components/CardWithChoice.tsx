import { FC, useState } from "react";
import StatusCode from "status-code-enum";

import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

import { Card } from "./";
import { ErrorType } from "../utils";
import { Answer, AnswerModel, Card as CardType } from "../types";
import { defaultViewPanels, getRoutePath } from "../routes";
import { postUserAnswersUrl } from "../api";

import "../styles/components/card-with-choice.css";

export interface CardWithChoiceProps {
  userId: number;
  cards: CardType[];
}

export const CardWithChoice: FC<CardWithChoiceProps> = ({ userId, cards }) => {
  const routeNavigator = useRouteNavigator();

  const [index, setIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const saveAnswers = async (allAnswers: Answer[]): Promise<boolean> => {
    const saveAnswersUrl = postUserAnswersUrl(userId);

    try {
      const res = await fetch(saveAnswersUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(allAnswers)
      });

      return res.status === StatusCode.SuccessOK;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleAnswer = async (isCorrect: boolean) => {
    const answer = new AnswerModel(cards[index].id, isCorrect);
    setAnswers((prev) => [...prev, answer]);

    const nextIndex = index + 1;

    if (nextIndex < cards.length) {
      setIndex(nextIndex);
      return;
    }

    const allAnswers = [...answers, answer];
    const answersSaved = await saveAnswers(allAnswers);

    if (!answersSaved) {
      routeNavigator.push({
        pathname: getRoutePath(defaultViewPanels.error),
        search: {
          errorType: ErrorType.saveData
        }
      });

      return;
    }

    const correctAnswersCount = allAnswers.filter((t) => t.isCorrect).length;
    const incorrectAnswersCount = allAnswers.length - correctAnswersCount;

    routeNavigator.push({
      pathname: getRoutePath(defaultViewPanels.results),
      search: {
        correctAnswersCount: correctAnswersCount.toString(),
        incorrectAnswersCount: incorrectAnswersCount.toString()
      }
    });
  };

  return (
    <div>
      <div className="container py-5">
        <div className="row mb-4">
          <div className="col-md-6 offset-md-3">
            <Card key={index} card={cards[index]} />
          </div>
        </div>

        <div className="text-center">
          <button
            className="btn btn-outline-primary rounded-circle me-5 answer-button"
            onClick={() => handleAnswer(false)}>
            <i className="fas fa-times"></i>
          </button>
          <button
            className="btn btn-outline-primary rounded-circle answer-button"
            onClick={() => handleAnswer(true)}>
            <i className="fas fa-check"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
