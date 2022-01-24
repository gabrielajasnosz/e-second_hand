import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { TRANSLATIONS_PL } from "./pl/translations";
import { TRANSLATIONS_EN } from "./en/translations";
import i18next from "i18next";


i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            pl: {
                translation: TRANSLATIONS_PL
            },
            en: {
                translation: TRANSLATIONS_EN
            }
        }
    });

