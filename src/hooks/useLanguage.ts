import { useTranslation } from "react-i18next";
import { type Language, supportedLanguages } from "@/lib/i18n";

export function useLanguage() {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language as Language;
  
  const currentLanguageInfo = supportedLanguages.find(
    (lang) => lang.code === currentLanguage
  ) || supportedLanguages[0];

  const changeLanguage = (code: Language) => {
    i18n.changeLanguage(code);
  };

  return {
    currentLanguage,
    currentLanguageInfo,
    changeLanguage,
    supportedLanguages,
  };
}
