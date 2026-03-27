import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Overview } from "./components/Overview";
import { BankAccounts } from "./components/BankAccounts/BankAccounts";
import { CreditCards } from "./components/CreditCards/CreditCards";
import { CombinedView } from "./components/CombinedView/CombinedView";
import { AllTransactions } from "./components/Transactions/AllTransactions";
import { UnbilledAlerts } from "./components/UnbilledAlerts/UnbilledAlerts";
import { Portfolio } from "./components/Portfolio/Portfolio";
import { ChartsInsights } from "./components/ChartsInsights/ChartsInsights";

import { MFAnalysis } from "./components/MFAnalysis/MFAnalysis";
import { Operations } from "./components/Operations/Operations";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Overview },
      { path: "banks", Component: BankAccounts },
      { path: "cards", Component: CreditCards },
      { path: "combined", Component: CombinedView },
      { path: "transactions", Component: AllTransactions },
      { path: "alerts", Component: UnbilledAlerts },
      { path: "portfolio", Component: Portfolio },
      { path: "charts", Component: ChartsInsights },
      { path: "mf-analysis", Component: MFAnalysis },
      { path: "ops", Component: Operations },
      { path: "*", Component: () => <div className="p-8 text-white">WIP: Other pages not yet implemented.</div> }
    ],
  },
]);
