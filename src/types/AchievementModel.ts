import { Achievement } from "./";

export class AchievementModel implements Achievement {
  constructor(
    public readonly currentProgress: number = 0,
    public readonly nextLevelProgress: number = 0,
    public readonly level: number = 0,
    public readonly hasMaxLevel: boolean = false
  ) {}
}
