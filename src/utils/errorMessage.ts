import { TFunction } from "i18next";

export enum ErrorType {
  INTERNAL = "internal",
  LOAD_DATA = "loadData",
  SAVE_DATA = "saveData"
}

export function getErrorMessage(errorType: string, t: TFunction): string {
  return t(`error.${errorType}`);
}
