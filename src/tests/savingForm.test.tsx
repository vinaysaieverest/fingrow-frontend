import { fireEvent, render,screen, waitFor } from "@testing-library/react";
import { Saving } from "../components/savingsForm";
import '@testing-library/jest-dom';
import { dataContext } from "../context/GlobalContext";
import axios from "axios";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("should test the savings form",()=>{
    test("should test the input fields are present in the savinsg forms",()=>{
        const mockContextValue = {
            username:"Vinaysai"
          };
          render(
            <dataContext.Provider value={mockContextValue}>
              <Saving />
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

        const data = {
            goal: "Vinay",
            target: "5000",
        };
          (axios.post as jest.Mock).mockResolvedValue(data);
      
          render(
            <dataContext.Provider value={mockContextValue}>
              <Saving />
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
                target: "5000",
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
                <Saving/>
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
                target: "5000",
                }
              );
              expect(window.alert).toHaveBeenCalledWith(
                "No saving found please create the budget"
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
                <Saving/>
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
                    target: "5000",
                }
              );
              expect(window.alert).toHaveBeenCalledWith(
                "Saving created succesfully"
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
                <Saving/>
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
                    target: "5000",
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
                <Saving/>
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
                    target: "5000",
                }
              );
              expect(window.alert).toHaveBeenCalledWith(
                "Saving created succesfully"
              );
              
            });
          });
    })
