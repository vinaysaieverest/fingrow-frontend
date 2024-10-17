import { useContext } from "react";
import "./App.css";
import { Budget } from "./components/budgetForm";
import { HomeIntro } from "./components/homeIntro";
import { Transaction } from "./components/transaction";
import { LoginPage } from "./components/login";
import { RegisterPage } from "./components/register";
import { dataContext } from "./context/GlobalContext";
import { RecentTransaction } from "./components/recentTransaction";
import { Report } from "./components/report";
import { Tcard, Rcard } from "./types";

function App() {
  const { isLogin, Tdata, Rdata } = useContext(dataContext);
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
            <Budget title="Budget" />
            <Budget title="Saving" />
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
          {Tdata.length === 0 ? (
            <h1>No transaction found</h1>
          ) : (
            Tdata.map((item: Tcard) => (
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
            }}
          >
            <h1 style={{ color: "white" }}> Budget Report </h1>
          </div>
          {Rdata.length===0?(
            <h1>Please make a transaction</h1>
          ):(
            Rdata.map((item: Rcard) => (
              <Report
                key={item.category}
                category={item.category}
                allocatedAmount={item.allocatedAmount}
                spentAmount={item.spentAmount}
              />
            ))
          )
        }
        </>
      ) : (
        <>
          <div className="loginDiv">
            <LoginPage />
            <RegisterPage />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
