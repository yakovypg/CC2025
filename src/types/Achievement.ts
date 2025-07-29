export interface Achievement {
  currentProgress: number;
  nextLevelProgress: number;
  level: number;
  hasMaxLevel: boolean;
}

export const isAchievement = (obj: unknown): obj is Achievement => {
  return (
    obj !== null &&
    typeof obj === "object" &&
    "currentProgress" in obj &&
    "nextLevelProgress" in obj &&
    "level" in obj &&
    "hasMaxLevel" in obj &&
    typeof obj.currentProgress === "number" &&
    typeof obj.nextLevelProgress === "number" &&
    typeof obj.level === "number" &&
    typeof obj.hasMaxLevel === "boolean"
  );
};
