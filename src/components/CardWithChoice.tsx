import { FC, useState } from "react";

import { Card } from "./Card";
import { Card as CardType } from "../types";

import "../styles/components/card-with-choice.css";

export interface CardWithChoiceProps {
  cards: CardType[];
}

export const CardWithChoice: FC<CardWithChoiceProps> = ({ cards }) => {
  const [index, setIndex] = useState<number>(0);

  const nextTextPair = () => {
    if (index + 1 >= cards.length) {
      return;
    }

    setIndex((prev) => prev + 1);
  };

  const markAsWrongAnswer = () => {
    nextTextPair();
  };

  const markAsRightAnswer = () => {
    nextTextPair();
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
            onClick={markAsWrongAnswer}
          >
            <i className="fas fa-times"></i>
          </button>
          <button
            className="btn btn-outline-primary rounded-circle answer-button"
            onClick={markAsRightAnswer}
          >
            <i className="fas fa-check"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
