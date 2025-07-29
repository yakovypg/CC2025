import { Statistics } from "./Statistics.ts";

export class StatisticsModel implements Statistics {
  constructor(
    public readonly correctAnswers = 0,
    public readonly incorrectAnswers = 0,
    public readonly currentSeries = 0,
    public readonly bestSeries = 0,
    public readonly strikeCounter = 0
  ) {}
}
