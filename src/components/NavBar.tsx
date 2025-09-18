import CreateTaskModal from "@/components/CreateTaskModal";
import UserProfile from "@/components/UserProfile";
import logo from "@/assets/scrum.svg";
import { useTranslation } from "react-i18next";

export default function NavBar() {
  const { t } = useTranslation();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 shadow-sm bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="shrink-0">
              <img src={logo} alt="Your Company" className="size-16" />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="#"
                  className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-white/5"
                >
                  {t('navbar.teams')}
                </a>
                <a
                  href="#"
                  className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-white/5"
                >
                  {t('navbar.projects')}
                </a>
                <a
                  href="#"
                  className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-white/5"
                >
                  {t('navbar.calendar')}
                </a>
                <a
                  href="#"
                  className="rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-white/5"
                >
                  {t('navbar.reports')}
                </a>
                <CreateTaskModal />
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <UserProfile />
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">{t('navbar.open_menu')}</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                data-slot="icon"
                aria-hidden="true"
                className="size-6 in-aria-expanded:hidden"
              >
                <path
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                data-slot="icon"
                aria-hidden="true"
                className="size-6 not-in-aria-expanded:hidden"
              >
                <path
                  d="M6 18 18 6M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
