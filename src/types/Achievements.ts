import { Achievement, isAchievement } from "./";

export interface Achievements {
  daysInStrike: Achievement;
  rightAnswers: Achievement;
  perfectSeries: Achievement;
  veteran: Achievement;
}

export const isAchievements = (obj: unknown): obj is Achievements => {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "daysInStrike" in obj &&
    "rightAnswers" in obj &&
    "perfectSeries" in obj &&
    "veteran" in obj &&
    isAchievement(obj.daysInStrike) &&
    isAchievement(obj.rightAnswers) &&
    isAchievement(obj.perfectSeries) &&
    isAchievement(obj.veteran)
  );
};
