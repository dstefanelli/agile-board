import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <header className="relative bg-white shadow-sm pt-16">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-1xl font-bold tracking-tight text-gray-900">
          {t('dashboard_page.welcome_message', { name: user?.name || 'User'})}
        </h1>
      </div>
    </header>
  );
}
