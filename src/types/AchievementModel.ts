import { Achievement } from "./Achievement.ts";

export class AchievementModel implements Achievement {
  currentProgress = 0;
  nextLevelProgress = 0;
  level = 0;
  hasMaxLevel = false;

  constructor(init?: Partial<AchievementModel>) {
    Object.assign(this, init);
  }
}
