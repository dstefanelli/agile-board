import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(
        resourcesToBackend((language, namespace, callback) => {
            import(`./locales/${language}/${namespace}.json`)
                .then((resources) => {
                    callback(null, resources);
                })
                .catch((error) => {
                    callback(error, null);
                });     
        })
    )
    .init({
        debug: true,
        fallbackLng: 'en',
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage']
        },
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
