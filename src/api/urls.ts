const BASE_URL = "https://localhost:8080";

export const postUserUrl = (): string => {
  return `${BASE_URL}/api/user`;
}

export const getUserUrl = (userId: string | number): string => {
  return `${BASE_URL}/api/user/${userId}`;
};

export const getUserAchievementUrl = (userId: string | number, achievementType: string): string => {
  return `${BASE_URL}/api/user/${userId}/achievement/${achievementType}`;
};

export const getUserAchievementsUrl = (userId: string | number): string => {
  return `${BASE_URL}/api/user/${userId}/achievements`;
};

export const getUserStatisticsUrl = (userId: string | number): string => {
  return `${BASE_URL}/api/user/${userId}/statistics`;
};
