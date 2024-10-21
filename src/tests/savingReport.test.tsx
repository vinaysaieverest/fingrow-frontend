import {  render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import {  savingsTypes } from "../types";
import { SavingReport } from "../components/savingReport";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>


describe('should get the all recent transactions ',()=>{
    test('renders RecentTransaction component with correct props', () => {
        const savingProps: savingsTypes = {
            Saving:"Bike",
            Target:5000,
            Current:2000
        };
        render(<SavingReport {...savingProps} />);
        expect(screen.getByTestId('categoryName')).toHaveTextContent('Bike');
        expect(screen.getByTestId('currentAmount')).toHaveTextContent('5000');
        expect(screen.getByTestId('spendAmount')).toHaveTextContent('2000');
        
      });
})