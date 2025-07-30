import { EGetLaunchParamsResponseLanguages } from "@vkontakte/vk-bridge";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import { getLaunchLanguage } from "./config";

const launchLanguage: EGetLaunchParamsResponseLanguages =
  getLaunchLanguage() ?? EGetLaunchParamsResponseLanguages.EN;

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: [EGetLaunchParamsResponseLanguages.EN, EGetLaunchParamsResponseLanguages.RU],
    lng: launchLanguage,
    fallbackLng: EGetLaunchParamsResponseLanguages.EN,
    interpolation: { escapeValue: false },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json"
    }
  });

export default i18n;
