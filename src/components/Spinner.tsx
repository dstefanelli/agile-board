import { useTranslation } from "react-i18next";

export default function Spinner() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center h-[calc(100vh-70px)]">
      <div
        role="status"
        className="relative inline-block w-20 h-20 rounded-full border-[32px] border-current border-t-transparent border-b-transparent animate-spin"
      >
        <span className="sr-only">{t('global.loading')}</span>
      </div>
    </div>
  );
}
