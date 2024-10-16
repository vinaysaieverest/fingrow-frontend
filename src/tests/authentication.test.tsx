import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LoginPage } from "../components/login";
import { dataContext } from "../context/GlobalContext";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import axios from "axios";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockSetIsLogin = jest.fn();
const mockSetUsername = jest.fn();
const mockSetLoginUsername = jest.fn();

describe("LoginPage", () => {
  test("renders login form with username and password input fields", () => {
    // Mock the context values
    const mockContextValue = {
      loginUsername: "",
      setLoginUsername: jest.fn(),
      isLogin: false,
      setIslogin: jest.fn(),
      setUsername: jest.fn(),
    };

    render(
      <dataContext.Provider value={mockContextValue}>
        <LoginPage />
      </dataContext.Provider>
    );

    // Check for username input
    const userInput = screen.getByTestId("userInput");
    expect(userInput).toBeInTheDocument();

    // Check for password input
    const passwordInput = screen.getByTestId("passwordInput");
    expect(passwordInput).toBeInTheDocument();

    // Check for login button
    const loginButton = screen.getByTestId("loginButton");
    expect(loginButton).toBeInTheDocument();
  });

  test("successful login triggers appropriate state changes", async () => {
    const mockContextValue = {
      loginUsername: "",
      setLoginUsername: jest.fn(),
      isLogin: false,
      setIslogin: jest.fn(),
      setUsername: jest.fn(),
    };

    render(
      <dataContext.Provider value={mockContextValue}>
        <LoginPage />
      </dataContext.Provider>
    );

    // Mock the axios POST request
    mockedAxios.post.mockResolvedValue({
      status: 200,
      data: { success: true },
    });

    // Simulate form submission, button click, etc.
    const submitButton = screen.getByTestId("loginButton");
    fireEvent.click(submitButton);
  });
  test("displays what are value that we have entered", async () => {
    const mockContextValue = {
      loginUsername: "Vinay",
      loginPassword: "Vinaysai02",
      setLoginUsername: jest.fn(),
      isLogin: false,
      setIslogin: jest.fn(),
      setUsername: jest.fn(),
    };
    (axios.post as jest.Mock).mockResolvedValue(mockContextValue);

    render(
      <dataContext.Provider value={mockContextValue}>
        <LoginPage />
      </dataContext.Provider>
    );

    fireEvent.change(screen.getByTestId("userInput"), {
      target: { value: "Vinay" },
    });
    fireEvent.change(screen.getByTestId("passwordInput"), {
      target: { value: "Vinaysai02" },
    });

    fireEvent.click(screen.getByTestId("loginButton"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:5005/api/login",
        {
          name: "Vinay",
          password: "Vinaysai02",
        }
      );
    });
  });

  test("handles invalid login with alert for no user found", async () => {
    // Mock the axios POST request to simulate a 409 response
    (axios.post as jest.Mock).mockResolvedValue({
      status: 409,
    });

    window.alert = jest.fn();

    render(
      <dataContext.Provider
        value={{
          loginUsername: "testUser",
          setLoginUsername: mockSetLoginUsername,
          isLogin: false,
          setIslogin: mockSetIsLogin,
          setUsername: mockSetUsername,
        }}
      >
        <LoginPage />
      </dataContext.Provider>
    );

    // Simulate typing username and password
    fireEvent.change(screen.getByTestId("userInput"), {
      target: { value: "testUser" },
    });
    fireEvent.change(screen.getByTestId("passwordInput"), {
      target: { value: "password123" },
    });

    // Simulate login button click
    fireEvent.click(screen.getByTestId("loginButton"));

    await waitFor(() => {
      // Expect axios POST to be called
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:5005/api/login",
        {
          name: "testUser",
          password: "password123",
        }
      );

      expect(window.alert).toHaveBeenCalledWith(
        "No user found, Please register"
      );
      expect(mockSetLoginUsername).toHaveBeenCalledWith("");
    });
  });

  test("displays error on failed API request", async () => {
    (axios.post as jest.Mock).mockRejectedValue(new Error("Failed request"));
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <dataContext.Provider
        value={{
          loginUsername: "Vinay",
          setLoginUsername: mockSetLoginUsername,
          isLogin: false,
          setIslogin: mockSetIsLogin,
          setUsername: mockSetUsername,
        }}
      >
        <LoginPage />
      </dataContext.Provider>
    );

    fireEvent.change(screen.getByTestId("userInput"), {
      target: { value: "Vinay" },
    });
    fireEvent.change(screen.getByTestId("passwordInput"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByTestId("loginButton"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:5005/api/login",
        {
          name: "Vinay",
          password: "password123",
        }
      );

      expect(console.error).toHaveBeenCalledWith("Error pushing data to the database:",
      expect.anything() );
    });
  });
});
