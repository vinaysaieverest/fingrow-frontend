import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { dataContext } from "../context/GlobalContext";
import { RegisterPage } from "../components/register";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import axios from "axios";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;


describe("RegisterPage", () => {
  test("renders Register form with username,password and salary input fields", () => {
    render(<RegisterPage />);

    // Check for username input
    const userInput = screen.getByTestId("userInput");
    expect(userInput).toBeInTheDocument();

    // Check for password input
    const passwordInput = screen.getByTestId("passwordInput");
    expect(passwordInput).toBeInTheDocument();


    // Check for salary input
    const salaryInput = screen.getByTestId("salaryInput");
    expect(salaryInput).toBeInTheDocument();

    // Check for login button
    const loginButton = screen.getByTestId("submitButton");
    expect(loginButton).toBeInTheDocument();
  });

  test("successful register triggers appropriate state changes", async () => {
   render(<RegisterPage /> );
    // Mock the axios POST request
    mockedAxios.post.mockResolvedValue({
      status: 200,
      data: { success: true },
    });

    // Simulate form submission, button click, etc.
    const submitButton = screen.getByTestId("submitButton");
    fireEvent.click(submitButton);
  });
  test("displays what are value that we have entered", async () => {
    const mockContextValue = {
      username: "Vinay",
      password: "Vinaysai02",
      salary:"50000" 
    };
      
    (axios.post as jest.Mock).mockResolvedValue(mockContextValue);

    render(
        <RegisterPage />
    );

    fireEvent.change(screen.getByTestId("userInput"), {
      target: { value: "Vinay" },
    });
    fireEvent.change(screen.getByTestId("passwordInput"), {
      target: { value: "Vinaysai02" },
    });
    fireEvent.change(screen.getByTestId("salaryInput"), {
        target: { value: "50000" },
      });

    fireEvent.click(screen.getByTestId("submitButton"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:5005/api/register",
        {
          name: "Vinay",
          password: "Vinaysai02",
          salary:"50000"
        }
      );
    });
  });

  test("handles invalid login with alert for no user found", async () => {
    (axios.post as jest.Mock).mockResolvedValue({
      status: 409,
    });

    window.alert = jest.fn();

    render(
      
        <RegisterPage />
    );

    // Simulate typing username and password
    fireEvent.change(screen.getByTestId("userInput"), {
      target: { value: "Vinaysai" },
    });
    fireEvent.change(screen.getByTestId("passwordInput"), {
      target: { value: "Vinaysai123" },
    });
    fireEvent.change(screen.getByTestId("salaryInput"), {
      target: { value: "50000" },
    });

    // Simulate login button click
    fireEvent.click(screen.getByTestId("submitButton"));

    await waitFor(() => {
      // Expect axios POST to be called
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:5005/api/register",
        {
          name: "Vinaysai",
          password: "Vinaysai123",
          salary:"50000",
        }
      );

      expect(window.alert).toHaveBeenCalledWith(
        "User already found with this name, Please login"
      );
    });
  });

  test("displays error on failed API request", async () => {
    (axios.post as jest.Mock).mockRejectedValue(new Error("Failed request"));
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      
        <RegisterPage />
    );

    fireEvent.change(screen.getByTestId("userInput"), {
      target: { value: "Vinay" },
    });
    fireEvent.change(screen.getByTestId("passwordInput"), {
      target: { value: "Vinaysai123" },
    });
    fireEvent.change(screen.getByTestId("salaryInput"), {
      target: { value: "50000" },
    });

    fireEvent.click(screen.getByTestId("submitButton"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:5005/api/register",
        {
          name: "Vinay",
          password: "Vinaysai123",
          salary:"50000"
        }
      );

      expect(console.error).toHaveBeenCalledWith("Error pushing data to the database:",
      expect.anything() );
    });
  });
});
