import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { translations, type Language } from "./translations";

const STORAGE_KEY = "preferred-language";

// Get saved language or detect from browser
const getSavedLanguage = (): Language => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved in translations) {
      return saved as Language;
    }
  } catch {
    // localStorage not available
  }

  // Detect from browser
  const browserLang = navigator.language.split("-")[0];
  if (browserLang in translations) {
    return browserLang as Language;
  }

  return "en";
};

i18n.use(initReactI18next).init({
  resources: translations,
  lng: getSavedLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

// Save language preference when changed
i18n.on("languageChanged", (lng) => {
  try {
    localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    // localStorage not available
  }
});

export default i18n;
export { type Language, supportedLanguages } from "./translations";
