import { Statistics } from "./";

export class StatisticsModel implements Statistics {
  constructor(
    public readonly correctAnswers: number = 0,
    public readonly incorrectAnswers: number = 0,
    public readonly currentSeries: number = 0,
    public readonly bestSeries: number = 0,
    public readonly strikeCounter: number = 0
  ) {}
}
