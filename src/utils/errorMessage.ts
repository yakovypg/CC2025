import { TFunction } from "i18next";

export enum ErrorType {
  internal = "internal",
  loadData = "loadData",
  saveData = "saveData"
}

export function getErrorMessage(errorType: string, t: TFunction) {
  return t(`error.${errorType}`);
}
