import { FC, useState } from "react";
import { Card as CardType} from "../types"

import "../styles/components/card.css";

export interface CardProps {
  card: CardType;
}

export const Card: FC<CardProps> = ({ card }) => {
  const [flipped, setFlipped] = useState<boolean>(false);
  const cardClass = `text-card${flipped ? " flipped" : ""}`;

  return (
    <div className={cardClass} onClick={() => setFlipped((prev) => !prev)}>
      <div className="text-card-inner">
        <div className="text-card-front">
          <h4>{card.frontText}</h4>
        </div>
        <div className="text-card-back">
          <h4>{card.backText}</h4>
        </div>
      </div>
    </div>
  );
};
