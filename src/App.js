import "./App.css";
import { Route, Routes } from "react-router-dom";
import {
  CreateUserPage,
  Dashboard,
  GenerateInvoice,
  InventoryPage,
  Login,
  RetrunInventaoryPage,
  SalesReportPage,
} from "./pages";
import { TodaySalesReportComponent } from "./component/TodayReports";
import { MonthlySalesReportComponent } from "./component/MonthlyReports";
import { YearlySalesReportComponent } from "./component/YearlyReports";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/generateInvoice" element={<GenerateInvoice />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/retrun-inventory" element={<RetrunInventaoryPage />} />
        <Route path="/sales-report" element={<SalesReportPage />} />
        {/* <Route path="/sales-report/today" element={<TodaySalesReportComponent />} />
        <Route path="/sales-report/monthly" element={<MonthlySalesReportComponent />} />
        <Route path="/sales-report/yearly" element={<YearlySalesReportComponent />} /> */}
        <Route path="/view-all-invoices" element={<SalesReportPage />} />
        <Route path="/create-user" element={<CreateUserPage />} />
      </Routes>
    </>
  );
}

export default App;
