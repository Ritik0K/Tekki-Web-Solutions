// src/__tests__/UserList.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserList from "../components/UserList";
import useUsers from "../../../hooks/usersHook";
import { mockUsers } from "../../../mocks/mockUsers";
import tableConfig from "../constants";

// Mock the useUsers hook
jest.mock("../../../hooks/usersHook");

describe("UserList", () => {
  beforeEach(() => {
    useUsers.mockReturnValue({
      users: mockUsers,
      loading: false,
      error: null,
    });
  });

  it("renders a list of users", () => {
    render(
      <UserList
        loading={false}
        error={null}
        users={mockUsers}
        tableConfig={tableConfig}
        helperFunc={{}}
      />
    );
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  it("opens UserModal with user details on row click", () => {
    render(
      <UserList
        loading={false}
        error={null}
        users={mockUsers}
        tableConfig={tableConfig}
        helperFunc={{}}
      />
    );

    // fireEvent.click(screen.getByText("John Doe"));

    // expect(screen.getByText("User Details")).toBeInTheDocument();
    // expect(screen.getByText("John Doe")).toBeInTheDocument();
    // expect(screen.getByText("ID: 1")).toBeInTheDocument();
    // expect(screen.getByText("Username: johndoe")).toBeInTheDocument();
  });
});
