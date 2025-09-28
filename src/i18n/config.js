import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enTranslations from '../locales/en/translation.json';
import hiTranslations from '../locales/hi/translation.json';
import taTranslations from '../locales/ta/translation.json';

const resources = {
  en: {
    translation: enTranslations
  },
  hi: {
    translation: hiTranslations
  },
  ta: {
    translation: taTranslations
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: import.meta.env.DEV,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  }).then(() => {
    // Set initial language
    document.documentElement.lang = i18n.language;

    // Listen for language changes
    i18n.on('languageChanged', (lng) => {
      document.documentElement.lang = lng;
    });
  });

export default i18n;