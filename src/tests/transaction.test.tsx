import { Transaction } from "../components/transaction";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { dataContext } from "../context/GlobalContext";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import axios from "axios";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;


describe("should test the transactions components",()=>{
    test("should test the all the input field in the component",()=>{
        const mockValues = {
            username:"Vinaysai"
        };
        render(
            <dataContext.Provider value={mockValues}>
              <Transaction />
            </dataContext.Provider>
          );
    const heading = screen.getByTestId("heading");
    expect(heading).toBeInTheDocument();   
    expect(heading.textContent).toBe("Make a transaction") 

    const userInput = screen.getByTestId("nameInput");
    expect(userInput).toBeInTheDocument();

    const passwordInput = screen.getByTestId("amountInput");
    expect(passwordInput).toBeInTheDocument();

    const salaryInput = screen.getByTestId("typeInput");
    expect(salaryInput).toBeInTheDocument();

    const category = screen.getByTestId("categoryInput");
    expect(category).toBeInTheDocument();

    const submitButton = screen.getByTestId("submitButton");
    expect(submitButton).toBeInTheDocument();
    })
    test("should test the input field is working properly",()=>{
    })
    test("successful transaction input fileds", async () => {
      const mockContextValue = {
        username:"Vinaysai",
        transactionName:"Apple", 
        setTname:jest.fn()
      };
      const transactionDetails = {
        transactionName:"Apple",
        amount:"200",
        type:"Budget",
        category:"General",
      }
  
      render(
        <dataContext.Provider value={mockContextValue}>
          <Transaction />
        </dataContext.Provider>
      );
      mockedAxios.post.mockResolvedValue(transactionDetails);
      fireEvent.change(screen.getByTestId("nameInput"), {
        target: { value: "Apple" },
      });
      fireEvent.change(screen.getByTestId("amountInput"), {
        target: { value: "200" },
      });
      fireEvent.change(screen.getByTestId("typeInput"), {
          target: { value: "Budget" },
        });
        fireEvent.change(screen.getByTestId("categoryInput"), {
          target: { value: "General" },
        });
      // Simulate form submission, button click, etc.
      fireEvent.click(screen.getByTestId("submitButton"));
      await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith(
          "http://localhost:5005/api/transaction/Vinaysai",
          {
          transactionName:"Apple",
          amount:"200",
          type:"Budget",
          category:"General",
          }
        );
        
      });
    }); 
    test("successful transaction input fileds", async () => {
      const mockContextValue = {
        username:"Vinaysai",
        transactionName:"Apple", 
        setTname:jest.fn()
      };
      (axios.post as jest.Mock).mockResolvedValue({
        status: 200,
      });
      window.alert = jest.fn();
      render(
        <dataContext.Provider value={mockContextValue}>
          <Transaction />
        </dataContext.Provider>
      );
      fireEvent.change(screen.getByTestId("nameInput"), {
        target: { value: "Apple" },
      });
      fireEvent.change(screen.getByTestId("amountInput"), {
        target: { value: "200" },
      });
      fireEvent.change(screen.getByTestId("typeInput"), {
          target: { value: "Budget" },
        });
        fireEvent.change(screen.getByTestId("categoryInput"), {
          target: { value: "General" },
        });
      // Simulate form submission, button click, etc.
      fireEvent.click(screen.getByTestId("submitButton"));
      await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith(
          "http://localhost:5005/api/transaction/Vinaysai",
          {
          transactionName:"Apple",
          amount:"200",
          type:"Budget",
          category:"General",
          }
        );
        expect(window.alert).toHaveBeenCalledWith(
          "Transaction completed"
        );
      });
    }); 




    test("successful transaction input fileds", async () => {
      const mockContextValue = {
        username:"Vinaysai",
        transactionName:"Apple", 
        setTname:jest.fn()
      };


      (axios.post as jest.Mock).mockResolvedValue({
        status: 404,
      });
  
      window.alert = jest.fn();
  
      render(
        <dataContext.Provider value={mockContextValue}>
          <Transaction />
        </dataContext.Provider>
      );
      fireEvent.change(screen.getByTestId("nameInput"), {
        target: { value: "Apple" },
      });
      fireEvent.change(screen.getByTestId("amountInput"), {
        target: { value: "200" },
      });
      fireEvent.change(screen.getByTestId("typeInput"), {
          target: { value: "Budget" },
        });
        fireEvent.change(screen.getByTestId("categoryInput"), {
          target: { value: "General" },
        });
      // Simulate form submission, button click, etc.
      fireEvent.click(screen.getByTestId("submitButton"));
      await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith(
          "http://localhost:5005/api/transaction/Vinaysai",
          {
          transactionName:"Apple",
          amount:"200",
          type:"Budget",
          category:"General",
          }
        );
        expect(window.alert).toHaveBeenCalledWith(
          "No budget found please create the budget"
        );
        
      });
    }); 



    test("successful transaction input fileds", async () => {
      const mockContextValue = {
        username:"Vinaysai",
        transactionName:"Apple", 
        setTname:jest.fn()
      };
      const transactionDetails = {
        transactionName:"Apple",
        amount:"200",
        type:"Budget",
        category:"General",
      }
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      render(
        <dataContext.Provider value={mockContextValue}>
          <Transaction />
        </dataContext.Provider>
      );
      mockedAxios.post.mockRejectedValue(new Error("Failed request"));
      fireEvent.change(screen.getByTestId("nameInput"), {
        target: { value: "Apple" },
      });
      fireEvent.change(screen.getByTestId("amountInput"), {
        target: { value: "200" },
      });
      fireEvent.change(screen.getByTestId("typeInput"), {
          target: { value: "Budget" },
        });
        fireEvent.change(screen.getByTestId("categoryInput"), {
          target: { value: "General" },
        });
      // Simulate form submission, button click, etc.
      fireEvent.click(screen.getByTestId("submitButton"));
      await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith(
          "http://localhost:5005/api/transaction/Vinaysai",
          {
          transactionName:"Apple",
          amount:"200",
          type:"Budget",
          category:"General",
          }
        );

        expect(console.error).toHaveBeenCalledWith("",
          expect.anything() );
        
      });
    }); 

})