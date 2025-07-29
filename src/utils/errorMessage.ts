import { TFunction } from "i18next";

export enum ErrorType {
  INTERNAL = "INTERNAL",
  LOAD_DATA = "LOAD_DATA",
  SAVE_DATA = "SAVE_DATA"
}

export function getErrorMessage(errorType: string, t: TFunction) {
  return t(`error.${errorType}`);
}
