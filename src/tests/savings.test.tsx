import { fireEvent, render,screen, waitFor } from "@testing-library/react";
import { Budget } from "../components/budgetForm";
import '@testing-library/jest-dom';
import { dataContext } from "../context/GlobalContext";
import axios from "axios";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;



describe("should test the budget form",()=>{
    test("should test the input fields are present in the  budget forms",()=>{
        const mockContextValue = {
            username:"Vinaysai"
          };
          render(
            <dataContext.Provider value={mockContextValue}>
              <Budget />
            </dataContext.Provider>
          );
        const budgetTitle  = screen.getByTestId('titleInput')
        expect(budgetTitle).toBeInTheDocument()
        const amountTitle  = screen.getByTestId('amountInput')
        expect(amountTitle).toBeInTheDocument()
        const submitButton  = screen.getByTestId('submitButton')
        expect(submitButton).toBeInTheDocument()
    })
    test("should test the all input forms are working corretly",async ()=>{
        const mockContextValue = {
            username:"Vinaysai"
          };

        const a = {
            category: "Vinay",
            amount: "5000",
        };
          (axios.post as jest.Mock).mockResolvedValue(a);
      
          render(
            <dataContext.Provider value={mockContextValue}>
              <Budget />
            </dataContext.Provider>
          );
      
          fireEvent.change(screen.getByTestId("titleInput"), {
            target: { value: "Vinay" },
          });
          fireEvent.change(screen.getByTestId("amountInput"), {
            target: { value: "5000" },
          });
      
          fireEvent.click(screen.getByTestId("submitButton"));
      
          await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
              "http://localhost:5005/api/saving/Vinaysai",
              {
                goal: "Vinay",
                totalSaving: "5000",
              }
            );
          });
        });
        test("handles invalid login with alert for no user found", async () => {
            (axios.post as jest.Mock).mockResolvedValue({
              status: 404,
            });
        
            window.alert = jest.fn();
        
            render(
              <dataContext.Provider
                value={{
                  username:"Vinaysai"
                }}
              >
                <Budget/>
              </dataContext.Provider>
            );
        
            fireEvent.change(screen.getByTestId("titleInput"), {
              target: { value: "Vinay" },
            });
            fireEvent.change(screen.getByTestId("amountInput"), {
              target: { value: "5000" },
            });
        
            fireEvent.click(screen.getByTestId("submitButton"));
        
            await waitFor(() => {
              expect(axios.post).toHaveBeenCalledWith(
                "http://localhost:5005/api/saving/Vinaysai",
                {
                    goal: "Vinay",
                totalSaving: "5000",
                }
              );
              expect(window.alert).toHaveBeenCalledWith(
                "No budget found please create the budget"
              );
              
            });
          });
          test("handles invalid login with alert for no user found", async () => {
            (axios.post as jest.Mock).mockResolvedValue({
              status: 200,
            });
        
            window.alert = jest.fn();
        
            render(
              <dataContext.Provider
                value={{
                  username:"Vinaysai"
                }}
              >
                <Budget/>
              </dataContext.Provider>
            );
        
            fireEvent.change(screen.getByTestId("titleInput"), {
              target: { value: "Vinay" },
            });
            fireEvent.change(screen.getByTestId("amountInput"), {
              target: { value: "5000" },
            });
        
            fireEvent.click(screen.getByTestId("submitButton"));
            await waitFor(() => {
              expect(axios.post).toHaveBeenCalledWith(
                "http://localhost:5005/api/budget/Vinaysai",
                {
                    goal: "Vinay",
                    totalSaving: "5000",
                }
              );
              expect(window.alert).toHaveBeenCalledWith(
                "Budget created succesfully"
              );
              
            });
          });



          test("handles error in while creating new budget", async () => {
            (axios.post as jest.Mock).mockRejectedValue(new Error("Failed request"));
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            render(
              <dataContext.Provider
                value={{
                  username:"Vinaysai"
                }}
              >
                <Budget/>
              </dataContext.Provider>
            );
        
            fireEvent.change(screen.getByTestId("titleInput"), {
              target: { value: "Vinay" },
            });
            fireEvent.change(screen.getByTestId("amountInput"), {
              target: { value: "5000" },
            });
        
            fireEvent.click(screen.getByTestId("submitButton"));
        
            await waitFor(() => {
              expect(axios.post).toHaveBeenCalledWith(
                "http://localhost:5005/api/budget/Vinaysai",
                {
                    category: "Vinay",
                    amount: "5000",
                }
              );
              expect(console.error).toHaveBeenCalledWith("",
                expect.anything() );
              
            });
          });
          
          test("handles invalid login with alert for no user found", async () => {
            (axios.post as jest.Mock).mockResolvedValue({
              status: 200,
            });
        
            window.alert = jest.fn();
        
            render(
              <dataContext.Provider
                value={{
                  username:"Vinaysai"
                }}
              >
                <Budget/>
              </dataContext.Provider>
            );
        
            fireEvent.change(screen.getByTestId("titleInput"), {
              target: { value: "Vinay" },
            });
            fireEvent.change(screen.getByTestId("amountInput"), {
              target: { value: "5000" },
            });
        
            fireEvent.click(screen.getByTestId("submitButton"));
            await waitFor(() => {
              expect(axios.post).toHaveBeenCalledWith(
                "http://localhost:5005/api/budget/Vinaysai",
                {
                    category: "Vinay",
                    amount: "5000",
                }
              );
              expect(window.alert).toHaveBeenCalledWith(
                "Budget created succesfully"
              );
              
            });
          });
    })
