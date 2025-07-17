import { Card } from "./Card.ts";

export class CardModel implements Card {
  id = 0;
  frontText = "";
  backText = "";

  constructor(init?: Partial<CardModel>) {
    Object.assign(this, init);
  }
}
