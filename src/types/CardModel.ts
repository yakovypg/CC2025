import { Card } from "./";

export class CardModel implements Card {
  constructor(
    public readonly id: number = 0,
    public readonly frontText: string = "",
    public readonly backText: string = ""
  ) {}
}
