import i18n from "i18next";

export function changeLanguage(): void {
  const next: string = i18n.language === "ru" ? "en" : "ru";
  i18n.changeLanguage(next);
}
