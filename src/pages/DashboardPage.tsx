import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "@/api/tasks";
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import { TaskCard } from "@/components/TaskCard";
import Spinner from "@/components/Spinner";
import ErrorMessage from "@/components/ErrorMessage";

function DashboardPage() {
  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

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
                  <div className="group relative">
                    <h2 className="text-2xl font-bold text-gray-900">TO DO</h2>
                  </div>
                  {tasks.map((task) => (
                    <TaskCard task={task} key={task.id} />
                  ))}
                  {/* <div className="group relative">
                    <h2 className="text-2xl font-bold text-gray-900">
                      IN PROGRESS
                    </h2>
                  </div>
                  <div className="group relative">
                    <h2 className="text-2xl font-bold text-gray-900">DONE</h2>
                    <div></div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default DashboardPage;
