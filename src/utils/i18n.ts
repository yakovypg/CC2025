import i18n from "i18next";

export function changeLanguage() {
  const next = i18n.language === "ru" ? "en" : "ru";
  i18n.changeLanguage(next);
}
