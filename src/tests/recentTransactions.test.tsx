import { RecentTransaction } from "../components/recentTransaction";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { dataContext } from "../context/GlobalContext";
import "@testing-library/jest-dom";
import axios from "axios";
import { Tcard } from "../types";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>


describe('should get the all recent transactions ',()=>{
    test('renders RecentTransaction component with correct props', () => {
        // Mock props
        const transactionProps: Tcard = {
          transactionName: 'Apple',
          amount: 500,
          type: 'General',
          category: 'Groceries',
          createdAt: new Date('2024-10-17T10:00:00Z')
        };
      
        render(<RecentTransaction {...transactionProps} />);
      
        expect(screen.getByTestId('transactionName')).toHaveTextContent('Apple');
        expect(screen.getByTestId('amount')).toHaveTextContent('500 Rupees');
        expect(screen.getByTestId('type')).toHaveTextContent('General');
        expect(screen.getByTestId('category')).toHaveTextContent('Groceries');
        expect(screen.getByTestId('date')).toHaveTextContent('10/17/2024');  
      });
})