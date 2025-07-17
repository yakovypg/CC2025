const baseUrl = "https://localhost:8080";

export const postUserUrl = (): string => {
  return `${baseUrl}/api/user`;
};

export const getUserUrl = (userId: string | number): string => {
  return `${baseUrl}/api/user/${userId}`;
};

export const getUserAchievementsUrl = (userId: string | number): string => {
  return `${baseUrl}/api/user/${userId}/achievements`;
};

export const getUserStatisticsUrl = (userId: string | number): string => {
  return `${baseUrl}/api/user/${userId}/statistics`;
};

export const getUserMistakesUrl = (userId: string | number): string => {
  return `${baseUrl}/api/user/${userId}/mistakes`;
};

export const getCardsUrl = (cardsCount: number | null): string => {
  const queryString = Number.isInteger(cardsCount) ? `?cardsCount=${cardsCount}` : "";
  return `${baseUrl}/api/card${queryString}`;
};

export const getCardsByIdsUrl = (cardIds: number[]): string => {
  const queryString = cardIds.length > 0 ? "?" + cardIds.map((id) => `cardIds=${id}`).join("&") : "";
  return `${baseUrl}/api/card${queryString}`;
};
