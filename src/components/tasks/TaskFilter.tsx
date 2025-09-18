import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

interface TaskFilterProps {
  filter: string;
  setFilter: (value: string) => void;
  visibleCount: number;
  totalCount: number;
}

export default function TaskFilter({
  filter,
  setFilter,
  visibleCount,
  totalCount,
}: TaskFilterProps) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <Input
          id="task-filter"
          type="text"
          placeholder={t("dashboard_page.search_tasks")}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-md bg-white"
        />
      </div>
      <div className="text-sm text-gray-500">
        {t("dashboard_page.displaying_tasks", {
          visible: visibleCount,
          total: totalCount,
        })}
      </div>
    </div>
  );
}
