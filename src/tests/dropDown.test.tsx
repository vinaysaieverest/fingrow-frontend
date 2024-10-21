import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BudgetSavingSelector } from '../components/dropDown';
import { dataContext } from '../context/GlobalContext';
import '@testing-library/jest-dom';


describe('BudgetSavingSelector Component', () => {

  beforeEach(() => {
    
  });
  test('renders correctly', () => {
    const mockContextValue={
      selection:"",
       setSelection:jest.fn(),
       startDate:"", 
       setStartDate:jest.fn(),
       endDate:"",
        setEndDate:jest.fn(),
    }
    render(
      <dataContext.Provider value={mockContextValue}>
        <BudgetSavingSelector />
      </dataContext.Provider>
    );

    expect(screen.getByTestId("categoryInput")).toBeInTheDocument();
    expect(screen.getByTestId("startDate")).toBeInTheDocument();
    expect(screen.getByTestId("endDate")).toBeInTheDocument();
  });

  test('updates selection state on dropdown change', () => {
    const mockContextValue={
      selection:"",
       setSelection:jest.fn(),
       startDate:"", 
       setStartDate:jest.fn(),
       endDate:"",
        setEndDate:jest.fn(),
    }
    render(
      <dataContext.Provider value={mockContextValue}>
      <BudgetSavingSelector />
    </dataContext.Provider>
    );

    const selectElement = screen.getByTestId("categoryInput");
    fireEvent.change(selectElement, { target: { value: 'Saving' } });
    expect(mockContextValue.setSelection).toHaveBeenCalledWith('Saving');
  });

  test('updates start date state on date input change', () => {
    const mockContextValue={
      selection:"",
       setSelection:jest.fn(),
       startDate:"", 
       setStartDate:jest.fn(),
       endDate:"",
        setEndDate:jest.fn(),
    }
    render(
      <dataContext.Provider value={mockContextValue}>
      <BudgetSavingSelector />
    </dataContext.Provider>
    );

    const startDateInput = screen.getByTestId("startDate");
    fireEvent.change(startDateInput, { target: { value: '2024-01-01' } });
    expect(mockContextValue.setStartDate).toHaveBeenCalledWith('2024-01-01');
  });

  test('updates end date state on date input change', () => {
    const mockContextValue={
      selection:"",
       setSelection:jest.fn(),
       startDate:"", 
       setStartDate:jest.fn(),
       endDate:"",
        setEndDate:jest.fn(),
    }
    render(
      <dataContext.Provider value={mockContextValue}>
      <BudgetSavingSelector />
    </dataContext.Provider>
    );

    const endDateInput = screen.getByTestId("endDate");
    fireEvent.change(endDateInput, { target: { value: '2024-12-31' } });
    expect(mockContextValue.setEndDate).toHaveBeenCalledWith('2024-12-31');
  });

});
