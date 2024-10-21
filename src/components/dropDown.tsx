import React, { useContext, useState } from "react";
import { dataContext } from "../context/GlobalContext";
import axios from "axios";

export const BudgetSavingSelector = () => {
  const {selection, setSelection,startDate, setStartDate,endDate, setEndDate,budgetReportData} = useContext(dataContext);


  const handleSelectionChange = (event:any) => {
    setSelection(event.target.value)
  };
  const handleStartDateChange = (event:any) => {
    setStartDate(event.target.value)
  };
  const handleEndDateChange = (event:any) => {
    setEndDate(event.target.value)
  };
  const fetchReport = async () => {
  };

  return (
    <div className="form-container">
      <div className="form-group">
        <label htmlFor="budget-saving-select" className="label">
          Select:
        </label>
        <select
          id="budget-saving-select"
          value={selection}
          onChange={handleSelectionChange}
          className="select"
          data-testid="categoryInput"
        >
          <option value="Budget">Budget</option>
          <option value="Saving">Saving</option>
          <option value='Transactions'>Transactions</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="start-date-input" className="label">
          From:
        </label>
        <input
          type="date"
          id="start-date-input"
          value={startDate}
          onChange={handleStartDateChange}
          className="input"
          data-testid="startDate"
        />
      </div>

      <div className="form-group">
        <label htmlFor="end-date-input" className="label">
          To:
        </label>
        <input
          type="date"
          id="end-date-input"
          value={endDate}
          onChange={handleEndDateChange}
          className="input"
          data-testid="endDate"
        />
      </div>

    </div>
  );
};
