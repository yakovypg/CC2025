import { Achievement, AchievementModel, Achievements } from "./";

export class AchievementsModel implements Achievements {
  constructor(
    public readonly daysInStrike: Achievement = new AchievementModel(),
    public readonly rightAnswers: Achievement = new AchievementModel(),
    public readonly perfectSeries: Achievement = new AchievementModel(),
    public readonly veteran: Achievement = new AchievementModel()
  ) {}
}
