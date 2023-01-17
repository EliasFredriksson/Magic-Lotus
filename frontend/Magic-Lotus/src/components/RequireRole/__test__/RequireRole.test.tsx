import { render, screen } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { expect, vi } from "vitest";
import AuthRole from "../../../hooks/useAuth/AuthRole";
import * as useAuth from "../../../hooks/useAuth/useAuth";

import RequireRole from "../RequireRole";

describe("RequireRole Component Tests", async () => {
  const RequireRoleMock = (props: { roles: AuthRole[] }) => (
    <BrowserRouter>
      <Routes>
        <Route element={<RequireRole roles={props.roles} />}>
          <Route path="/" element={<div>TEST_CONTENT</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );

  it("Should render as user has sufficient role permissions", () => {
    // MOCK THE 'useNavigate' CUSTOM HOOK TO MAKE '<Main>' COMPONENT RENDER
    vi.spyOn(useAuth, "default").mockImplementation(() => ({
      credentials: {
        id: "1",
        username: "TEST_USERNAME",
        role: "user",
        email: "",
        favoriteCards: [],
      },
      logout: () => {},
      login: () => {},
      refetch: () => {},
      isLoggedIn: true,
      isLoading: false,
    }));

    render(<RequireRoleMock roles={["user"]} />);
    const div = screen.queryByText("TEST_CONTENT");
    expect(div).toBeInTheDocument();
  });

  it("Should not render as user role is 'public'", () => {
    // MOCK THE 'useNavigate' CUSTOM HOOK TO MAKE '<Main>' COMPONENT RENDER
    vi.spyOn(useAuth, "default").mockImplementation(() => ({
      credentials: {
        id: "1",
        username: "TEST_USERNAME",
        role: "public",
        email: "",
        favoriteCards: [],
      },
      logout: () => {},
      login: () => {},
      refetch: () => {},
      isLoggedIn: false,
      isLoading: false,
    }));

    render(<RequireRoleMock roles={["user"]} />);
    const div = screen.queryByText("TEST_CONTENT");
    expect(div).not.toBeInTheDocument();
  });
});
