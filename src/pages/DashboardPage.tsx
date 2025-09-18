import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "@/api/tasks";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import TaskCard from "@/components/TaskCard";
import Spinner from "@/components/Spinner";
import ErrorMessage from "@/components/ErrorMessage";
import { type Task } from "@/models/task";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export default function DashboardPage() {
  const { t } = useTranslation();

  const BOARD_COLUMNS = [
    { 
      id: "todo", 
      title: t('dashboard_page.to_do_column'), 
      status: "To Do" 
    },
    { 
      id: "in-progress", 
      title: t('dashboard_page.in_progress_column'),
      status: "In Progress" 
    },
    { 
      id: "done", 
      title: t('dashboard_page.done_column'), 
      status: "Done" 
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

  const groupedTasks = useMemo(() => {
    return tasks.reduce<Record<string, Task[]>>((acc, task) => {
      const status = task.status;
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(task);
      return acc;
    }, {});
  }, [tasks]);

  if (isError) return <ErrorMessage message="An error ocurred =(" />;

  return (
    <div className="min-h-full">
      <NavBar />
      <Header />
      {isLoading ? (
        <Spinner />
      ) : (
        <main>
          <div className="bg-gray-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:space-y-0 lg:gap-x-6">
                  {BOARD_COLUMNS.map((column) => (
                    <div key={column.id} className="group relative">
                      <h2 className="text-1xl font-bold text-gray-900 mb-4">
                        {column.title} {groupedTasks[column.status].length}
                      </h2>
                      {(groupedTasks[column.status] || []).map((task) => (
                        <TaskCard task={task} key={task.id} />
                      ))}
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
