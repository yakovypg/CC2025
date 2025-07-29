import { AchievementModel } from "./AchievementModel.ts";
import { Achievements } from "./Achievements.ts";

export class AchievementsModel implements Achievements {
  constructor(
    public readonly daysInStrike = new AchievementModel(),
    public readonly rightAnswers = new AchievementModel(),
    public readonly perfectSeries = new AchievementModel(),
    public readonly veteran = new AchievementModel()
  ) {}
}
