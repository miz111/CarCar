import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import ManufacturerList from "./inventory/ManufacturerList";
import ManufacturerForm from "./inventory/ManufacturerForm";
import VehicleList from "./inventory/VehicleList";
import VehicleListPictures from "./inventory/VehicleListPicture";
import VehicleForm from "./inventory/VehicleForm";
import AutomobileList from "./inventory/AutomobileList";
import AutomobileForm from "./inventory/AutomobileForm";
import SalesList from "./sales/SalesList";
import SalesRecordEdit from "./sales/SalesRecordEdit";
import SalesRecordForm from "./sales/SalesRecordForm";
import CustomerList from "./sales/CustomerList";
import CustomerForm from "./sales/CustomerForm";
import CustomerEdit from "./sales/CustomerEdit";
import SalesPersonList from "./sales/SalesPersonList";
import SalesPersonForm from "./sales/SalesPersonForm";
import SalesPersonEdit from "./sales/SalesPersonEdit";
import SalesHistory from "./sales/SalesHistory";
import AppointmentList from "./services/AppointmentList";
import AppointmentForm from "./services/AppointmentForm";
import AppointmentHistory from "./services/AppointmentHistory";
import AppointmentFilter from "./services/AppointmentFilter";
import AppointmentEdit from "./services/AppointmentEdit";
import TechnicianForm from "./services/TechnicianForm";
import TechnicianList from "./services/TechnicianList";
import TechnicianEdit from "./services/TechnicianEdit";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers">
            <Route index element={<ManufacturerList />} />
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
          <Route path="vehicles">
            <Route index element={<VehicleList />} />
            <Route path="new" element={<VehicleForm />} />
            <Route path="picture-view" element={<VehicleListPictures />} />
          </Route>
          <Route path="automobiles">
            <Route index element={<AutomobileList />} />
            <Route path="new" element={<AutomobileForm />} />
          </Route>
          <Route path="salesperson">
            <Route index element={<SalesPersonList />} />
            <Route path="new" element={<SalesPersonForm />} />
            <Route path="edit/:id/:name/:employee_number" element={<SalesPersonEdit />} />
          </Route>
          <Route path="customer">
            <Route index element={<CustomerList />} />
            <Route path="new" element={<CustomerForm />} />
            <Route path="edit/:id/:name/:address/:phone_number" element={<CustomerEdit />} />
          </Route>
          <Route path="sales-record">
            <Route index element={<SalesList />} />
            <Route path="new" element={<SalesRecordForm />} />
            <Route path="edit/:id/:sales_person/:customer/:automobile/:price" element={<SalesRecordEdit />} />
          </Route>
          <Route path="sales-history">
            <Route index element={<SalesHistory />} />
          </Route>
          <Route path="appointments">
            <Route index element={<AppointmentList />} />
            <Route path="history" element={<AppointmentHistory />} />
            <Route path="filter" element={<AppointmentFilter />} />
            <Route path="new" element={<AppointmentForm />} />
            <Route
              path="edit/:id/:vin/:customer_name/:date/:time/:technician/:reason"
              element={<AppointmentEdit />}
            />
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
