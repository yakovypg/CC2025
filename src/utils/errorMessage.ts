import { TFunction } from "i18next";

export enum ErrorType {
  internal = "internal",
  loadData = "loadData"
}

export function getErrorMessage(errorType: string, t: TFunction) {
  return t(`error.${errorType}`);
}
