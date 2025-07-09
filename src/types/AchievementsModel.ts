import { Achievements } from "./Achievements.ts";
import { AchievementModel } from "./AchievementModel.ts";

export class AchievementsModel implements Achievements {
  daysInStrike = new AchievementModel();
  rightAnswers = new AchievementModel();
  perfectSeries = new AchievementModel();
  veteran = new AchievementModel();

  constructor(init?: Partial<AchievementsModel>) {
    Object.assign(this, init);
  }
}
