import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "@/components/pages/LoginPage";
import DashboardPage from "@/components/pages/DashboardPage";
import Spinner from "@/components/feedback/Spinner";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <Spinner />;
  }
  return user ? children : <Navigate to="/login" replace />;
}

export default function AppRouter() {
  const { user } = useAuth();
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <QueryClientProvider client={queryClient}>
                <DashboardPage />
              </QueryClientProvider>
            </PrivateRoute>
          }
        />
        <Route 
          path="*" 
          element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} 
        />
      </Routes>
    </BrowserRouter>
  );
}
