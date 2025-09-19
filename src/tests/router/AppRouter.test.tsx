import { render, screen } from "@testing-library/react";
import AppRouter from "@/router/AppRouter";
import { vi, describe, it, beforeEach, afterEach } from "vitest";
import type { Mock } from "vitest";

vi.mock("@/hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

import { useAuth } from "@/hooks/useAuth";

vi.mock("@/components/pages/LoginPage", () => ({
  default: () => <div>Login Page</div>,
}));
vi.mock("@/components/pages/DashboardPage", () => ({
  default: () => <div>Dashboard Page</div>,
}));
vi.mock("@/components/feedback/Spinner", () => ({
  default: () => <div>Loading Spinner</div>,
}));

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return { ...(actual as object) };
});

describe("AppRouter test", () => {
  const mockedUseAuth = useAuth as Mock;
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    window.history.pushState({}, "", "/");
  });

  it("Shows spinner while auth is loading", () => {
    mockedUseAuth.mockReturnValue({ user: null, isLoading: true });
    window.history.pushState({}, "", "/dashboard");
    render(<AppRouter />);
    expect(screen.getByText("Loading Spinner")).toBeDefined();
  });

  it("Renders LoginPage for /login when not authenticated", () => {
    mockedUseAuth.mockReturnValue({ user: null, isLoading: false });
    window.history.pushState({}, "", "/login");
    render(<AppRouter />);
    expect(screen.getByText("Login Page")).toBeDefined();
  });

  it("Redirects to /login when accessing /dashboard unauthenticated", () => {
    mockedUseAuth.mockReturnValue({ user: null, isLoading: false });
    window.history.pushState({}, "", "/dashboard");
    render(<AppRouter />);
    expect(screen.getByText("Login Page")).toBeDefined();
  });

  it("Redirects to /dashboard when user is authenticated", () => {
    mockedUseAuth.mockReturnValue({ user: { id: "1" }, isLoading: false });
    window.history.pushState({}, "", "/");
    render(<AppRouter />);
    expect(screen.getByText("Dashboard Page")).toBeDefined();
  });
});
