import { Answer } from "./";

export class AnswerModel implements Answer {
  constructor(
    public readonly cardId: number,
    public readonly isCorrect: boolean
  ) {}
}
