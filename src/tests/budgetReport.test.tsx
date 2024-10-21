import { RecentTransaction } from "../components/recentTransaction";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { dataContext } from "../context/GlobalContext";
import "@testing-library/jest-dom";
import axios from "axios";
import { Rcard, Tcard } from "../types";
import { BudgetReport } from "../components/budgetReport";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>


describe('should get the all recent transactions ',()=>{
    test('renders RecentTransaction component with correct props', () => {
        const reportProps: Rcard = {
            category:"General",
            allocatedAmount:5000,
            spentAmount:2000
        };
        render(<BudgetReport {...reportProps} />);
        expect(screen.getByTestId('categoryName')).toHaveTextContent('General');
        expect(screen.getByTestId('currentAmount')).toHaveTextContent('5000');
        expect(screen.getByTestId('spendAmount')).toHaveTextContent('2000');
        
      });
})