import { FC, useState } from "react";

import "../styles/components/card.css";

export interface CardProps {
  textPair: [string, string];
}

export const Card: FC<CardProps> = ({ textPair }) => {
  const [flipped, setFlipped] = useState<boolean>(false);
  const cardClass = `text-card${flipped ? " flipped" : ""}`;

  return (
    <div className={cardClass} onClick={() => setFlipped((prev) => !prev)}>
      <div className="text-card-inner">
        <div className="text-card-front">
          <h4>{textPair[0]}</h4>
        </div>
        <div className="text-card-back">
          <h4>{textPair[1]}</h4>
        </div>
      </div>
    </div>
  );
};
