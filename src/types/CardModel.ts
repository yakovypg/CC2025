import { Card } from "./Card.ts";

export class CardModel implements Card {
  constructor(
    public readonly id = 0,
    public readonly frontText = "",
    public readonly backText = ""
  ) {}
}
