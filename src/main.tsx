import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App.tsx";
import { AuthProvider } from "@/context/AuthContext";

if (import.meta.env.VITE_NODE_ENV) {
  const { worker } = await import("@/mocks/browser");
  worker.start();
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
