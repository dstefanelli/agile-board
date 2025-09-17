import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { makeServer } from "@/mocks/server";
import App from "@/App.tsx";
import { AuthProvider } from "@/context/AuthProvider";
import { EnvConfig } from '@/configs/env.config';

const { environment } = EnvConfig();
if (environment === 'development') {
  makeServer();
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
