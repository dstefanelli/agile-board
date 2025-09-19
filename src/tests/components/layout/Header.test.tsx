
import { render, screen } from "@testing-library/react";
import Header from "@/components/layout/Header";
import { vi, beforeEach, describe, it, expect } from "vitest";
import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "react-i18next";
import type { Mock } from "vitest";

vi.mock("@/hooks/useAuth", () => ({ useAuth: vi.fn() }));
vi.mock("react-i18next", () => ({ useTranslation: vi.fn() }));


const mockedUseAuth = useAuth as Mock;
const mockedUseTranslation = useTranslation as Mock;

beforeEach(() => {
    vi.clearAllMocks();
});

describe("Header", () => {
    it("renders welcome message with the user's name", () => {
        const tMock = vi.fn((_key: string, opts: Record<string, unknown>) => `translated:${opts?.name}`);
        mockedUseTranslation.mockReturnValue({ t: tMock });

        mockedUseAuth.mockReturnValue({ user: { name: "Alice" } });

        render(<Header />);

        const heading = screen.getByRole("heading", { level: 1 });
        expect(heading.textContent).toBe("translated:Alice");
        expect(tMock).toHaveBeenCalledWith("dashboard_page.welcome_message", { name: "Alice" });
    });
});