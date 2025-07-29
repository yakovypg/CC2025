import { Achievement } from "./Achievement.ts";

export class AchievementModel implements Achievement {
  constructor(
    public readonly currentProgress = 0,
    public readonly nextLevelProgress = 0,
    public readonly level = 0,
    public readonly hasMaxLevel = false
  ) {}
}
