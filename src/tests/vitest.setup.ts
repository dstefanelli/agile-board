import "@testing-library/jest-dom/vitest";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Load locales
import en from "@/locales/en-US/translation.json";
import es from "@/locales/es/translation.json";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  interpolation: { escapeValue: false },
});

// Provide mock for react-i18next
import { vi } from "vitest";
vi.mock("react-i18next", async () => {
  const actual = await vi.importActual<typeof import("react-i18next")>(
    "react-i18next"
  );
  return {
    ...actual,
    useTranslation: () => ({
      t: (k: string, opts?: Record<string, unknown>) => i18n.t(k, opts),
      i18n,
    }),
  };
});
