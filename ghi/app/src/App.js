import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ManufacturerList from "./ManufacturerList";
import ManufacturerForm from "./ManufacturerForm";
import VehicleList from "./VehicleList";
import VehicleForm from "./VehicleForm";
import AutomobileList from "./AutomobileList";
import AutomobileForm from "./AutomobileForm";
import SalesList from "./SalesList";
import SalesRecordForm from "./SalesRecordForm";
import CustomerList from "./CustomerList";
import CustomerForm from "./CustomerForm";
import SalesPersonList from "./SalesPersonList";
import SalesPersonForm from "./SalesPersonForm";
import SalesHistory from "./SalesHistory";
import AppointmentList from "./AppointmentList";
import AppointmentForm from "./AppointmentForm";
import AppointmentHistory from "./AppointmentHistory";
import AppointmentFilter from "./AppointmentFilter";
import TechnicianForm from "./TechnicianForm";
import TechnicianList from "./TechnicianList";
import TechnicianEdit from "./TechnicianEdit";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturer">
            <Route index element={<ManufacturerList />} />
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
          <Route path="vehicles">
            <Route index element={<VehicleList />} />
            <Route path="new" element={<VehicleForm />} />
          </Route>
          <Route path="automobiles">
            <Route index element={<AutomobileList />} />
            <Route path="new" element={<AutomobileForm />} />
          </Route>
          <Route path="salesperson">
            <Route index element={<SalesPersonList />} />
            <Route path="new" element={<SalesPersonForm />} />
          </Route>
          <Route path="customer">
            <Route index element={<CustomerList />} />
            <Route path="new" element={<CustomerForm />} />
          </Route>
          <Route path="sales-record">
            <Route index element={<SalesList />} />
            <Route path="new" element={<SalesRecordForm />} />
          </Route>
          <Route path="sales-history">
            <Route index element={<SalesHistory />} />
          </Route>
          <Route path="appointments">
            <Route index element={<AppointmentList />} />
            <Route path="history" element={<AppointmentHistory />} />
            <Route path="filter" element={<AppointmentFilter />} />
            <Route path="new" element={<AppointmentForm />} />
          </Route>
          <Route path="technicians">
            <Route index element={<TechnicianList />} />
            <Route path="new" element={<TechnicianForm />} />
            <Route
              path="edit/:id/:employee_number/:name"
              element={<TechnicianEdit />}
            />
          </Route>
          <Route
            path="*"
            element={
              <main className="danger danger-alert" style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
