
import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";
import Spinner from "@/components/feedback/Spinner";

describe("Spinner Test", () => {
    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    });

    it("Renders a status element", () => {
        render(<Spinner />);
        const status = screen.getByRole("status");
        expect(status).toBeTruthy();
    });

    it("Renders translated accessible text for loading", () => {
        render(<Spinner />);
        const text = screen.getByText("Loading...");
        expect(text).toBeTruthy();
    });
});