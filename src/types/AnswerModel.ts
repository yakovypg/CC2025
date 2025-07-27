import { Answer } from ".";

export class AnswerModel implements Answer {
  cardId: number;
  isCorrect: boolean;

  constructor(cardId: number, isCorrect: boolean) {
    this.cardId = cardId;
    this.isCorrect = isCorrect;
  }
}
