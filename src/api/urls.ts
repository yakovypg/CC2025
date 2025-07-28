import { SERVER_URL } from "../config";

export const postUserUrl = (): string => {
  return `${SERVER_URL}/api/user`;
};

export const postUserAnswersUrl = (userId: string | number): string => {
  return `${SERVER_URL}/api/user/${userId}/answers`;
};

export const deleteUserMistakesUrl = (userId: string | number): string => {
  return `${SERVER_URL}/api/user/${userId}/mistakes`;
};

export const getUserUrl = (userId: string | number): string => {
  return `${SERVER_URL}/api/user/${userId}`;
};

export const getUserAchievementsUrl = (userId: string | number): string => {
  return `${SERVER_URL}/api/user/${userId}/achievements`;
};

export const getUserStatisticsUrl = (userId: string | number): string => {
  return `${SERVER_URL}/api/user/${userId}/statistics`;
};

export const getUserMistakesUrl = (userId: string | number): string => {
  return `${SERVER_URL}/api/user/${userId}/mistakes`;
};

export const getCardsUrl = (cardsCount: number | null): string => {
  const queryString = Number.isInteger(cardsCount) ? `?cardsCount=${cardsCount}` : "";
  return `${SERVER_URL}/api/card${queryString}`;
};

export const getCardsByIdsUrl = (cardIds: number[]): string => {
  const queryString =
    cardIds.length > 0 ? "?" + cardIds.map((id) => `cardIds=${id}`).join("&") : "";

  return `${SERVER_URL}/api/card${queryString}`;
};
