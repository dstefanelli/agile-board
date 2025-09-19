import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { describe, it } from "vitest";
import { AuthProvider } from "@/context/AuthProvider";
import LoginPage from "@/components/pages/LoginPage";

const mockNavigate = vi.fn();
const mockLogin = vi.fn();

vi.mock("react-router", async () => {
  const actual = await vi.importActual<typeof import("react-router")>(
    "react-router"
  );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({ login: mockLogin }),
}));

describe("Login page Test", () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    mockLogin.mockReset();
  });

  it("Render the component", () => {
    render(
      <AuthProvider>
        <BrowserRouter>
          <LoginPage></LoginPage>
        </BrowserRouter>
      </AuthProvider>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("Calls login and navigates to /dashboard on success", async () => {
    mockLogin.mockResolvedValue(undefined);

    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "1234" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: /login|submit|iniciar/i })
    );

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("test@example.com", "1234");
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("Shows an error message when login fails", async () => {
    mockLogin.mockRejectedValue(new Error("invalid"));

    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "wrongmail@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "incorrect" },
    });
    fireEvent.click(
      screen.getByRole("button", { name: /login|submit|iniciar/i })
    );

    await waitFor(() => {
      expect(
        screen.getByText(/invalid email or password|invalid_credentials/i)
      ).toBeInTheDocument();
    });

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
