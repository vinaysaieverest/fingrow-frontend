import { HomeIntro } from "../components/homeIntro";
import { dataContext } from "../context/GlobalContext";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';


describe('should test the home screen component',()=>{
    test("should pass the test if the username is correct",()=>{
        const mockContext ={
            username: "Vinaysai"
        };
        render(
            <dataContext.Provider value={mockContext}>
              <HomeIntro />
            </dataContext.Provider>
          );
          const username = screen.getByTestId("username");
          expect(username).toBeInTheDocument();
          expect(username.textContent).toBe("Welcome Vinaysai");
    })
})

