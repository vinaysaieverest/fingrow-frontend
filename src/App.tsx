import { useContext } from "react";
import "./App.css";
import { Budget } from "./components/budgetForm";
import { Saving } from "./components/savingsForm";
import { HomeIntro } from "./components/homeIntro";
import { Transaction } from "./components/transaction";
import { LoginPage } from "./components/login";
import { RegisterPage } from "./components/register";
import { dataContext } from "./context/GlobalContext";
import { RecentTransaction } from "./components/recentTransaction";
import { BudgetReport } from "./components/budgetReport";
import { SavingReport } from "./components/savingReport";
import { Tcard, Rcard, savingsTypes } from "./types";
import { BudgetSavingSelector } from "./components/dropDown";

function App() {
  const {
    isLogin,
    TransactionData,
    budgetReportData,
    savingReportData,
    selection,
    transactionReport,
  } = useContext(dataContext);
  return (
    <div className="App">
      {isLogin ? (
        <>
          <HomeIntro />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1 style={{ color: "white" }}>Create a budget or saving goal</h1>
          </div>

          <div className="spendForms">
            <Budget />
            <Saving />
            <Transaction />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1 style={{ color: "white" }}>Recent transactions</h1>
          </div>
          {TransactionData.length === 0 ? (
            <h1
              style={{
                color: "red",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              No transaction found
            </h1>
          ) : (
            TransactionData.map((item: Tcard) => (
              <RecentTransaction
                key={item.transactionName}
                transactionName={item.transactionName}
                amount={item.amount}
                type={item.type}
                category={item.category}
                createdAt={item.createdAt}
              />
            ))
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "40px",
            }}
          >
            <h1 style={{ color: "white" }}> {selection} Report </h1>
          </div>

          <div style={{display:"flex",flexDirection:"row"}}>
            <BudgetSavingSelector />
            <div style={{marginRight:"120px",width:"800px",alignItems:"center"}}>
              {
                selection==="Budget"?(
                  budgetReportData.length === 0 ? (
                  <h1
                    style={{
                      color: "red",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      
                    }}
                  >
                    Please select the date
                  </h1>
                ) : (
                  budgetReportData.map((item: Rcard) => (
                    <BudgetReport
                      key={item.category}
                      category={item.category}
                      allocatedAmount={item.allocatedAmount}
                      spentAmount={item.spentAmount}
                    />
                  ))
                )):selection==="Saving"?(savingReportData.length === 0 ? (
                  <h1
                    style={{
                      color: "red",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Please select date
                  </h1>
                ) : (
                  savingReportData.map((item: savingsTypes) => (
                    <SavingReport
                      key={item.Saving}
                      Saving={item.Saving}
                      Target={item.Target}
                      Current={item.Current}
                    />
                  ))
                )):(transactionReport.length === 0 ? (
                  <h1
                    style={{
                      color: "red",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Please select date
                  </h1>
                ) : (
                  transactionReport.map((item: Tcard) => (
                    <RecentTransaction
                      key={item.transactionName}
                      transactionName={item.transactionName}
                      amount={item.amount}
                      type={item.type}
                      category={item.category}
                      createdAt={item.createdAt}
                    />
                  ))
                ))
              }
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="loginDiv" style={{display:"flex",height:"930px",justifyContent:"space-evenly"}}>
            <LoginPage />
            <RegisterPage />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
