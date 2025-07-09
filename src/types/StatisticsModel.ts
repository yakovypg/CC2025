import { Statistics } from "./Statistics.ts";

export class StatisticsModel implements Statistics {
  correctAnswers = 0;
  incorrectAnswers = 0;
  bestSeries = 0;
  strikeCounter = 0;

  constructor(init?: Partial<StatisticsModel>) {
    Object.assign(this, init);
  }
}
