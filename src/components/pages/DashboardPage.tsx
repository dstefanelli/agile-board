import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "@/api/tasks";
import Header from "@/components/layout/Header";
import NavBar from "@/components/layout/NavBar";
import TaskCard from "@/components/tasks/TaskCard";
import TaskFilter from "@/components/tasks/TaskFilter";
import Spinner from "@/components/feedback/Spinner";
import ErrorMessage from "@/components/feedback/ErrorMessage";
import { type Task } from "@/models/task";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export default function DashboardPage() {
  const { t } = useTranslation();

  const BOARD_COLUMNS = [
    {
      id: "todo",
      title: t("dashboard_page.to_do_column"),
      status: "To Do",
    },
    {
      id: "in-progress",
      title: t("dashboard_page.in_progress_column"),
      status: "In Progress",
    },
    {
      id: "done",
      title: t("dashboard_page.done_column"),
      status: "Done",
    },
  ];

  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const [filter, setFilter] = useState("");

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(filter.toLowerCase())
    );
  }, [tasks, filter]);

  const groupedTasks: Record<string, Task[]> = {
    "To Do": [],
    "In Progress": [],
    Done: [],
  };

  for (const task of filteredTasks) {
    groupedTasks[task.status].push(task);
  }

  if (isError) return <ErrorMessage message="An error ocurred =(" />;

  return (
    <div className="min-h-full bg-gray-100">
      <NavBar />
      <Header />
      {isLoading ? (
        <Spinner />
      ) : (
        <main>
          <div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl py-8 lg:max-w-none">
                <TaskFilter
                  filter={filter}
                  setFilter={setFilter}
                  visibleCount={filteredTasks.length}
                  totalCount={tasks.length}
                />
              </div>
            </div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl pb-16 lg:max-w-none">
                <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:space-y-0 lg:gap-x-6">
                  {BOARD_COLUMNS.map((column) => (
                    <div key={column.id} className="group relative">
                      <h2 className="text-1xl font-bold text-gray-900 mb-4">
                        {column.title}{" "}
                        {(groupedTasks[column.status] || []).length}
                      </h2>
                      <div>
                        {(groupedTasks[column.status] || []).map((task) => (
                          <TaskCard task={task} key={task.id} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
