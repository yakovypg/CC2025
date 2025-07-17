const BASE_URL = "http://localhost:8080";

export const getUserAchievementUrl = (userId: string | number, achievementType: string): string => {
  return `${BASE_URL}/user/${userId}/achievement/${achievementType}`;
};

export const getUserAchievementsUrl = (userId: string | number): string => {
  return `${BASE_URL}/user/${userId}/achievement`;
};

export const getUserStatisticsUrl = (userId: string | number): string => {
  return `${BASE_URL}/user/${userId}/statistics`;
};
