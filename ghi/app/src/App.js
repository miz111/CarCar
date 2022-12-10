import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import AutomobileList from "./AutomobileList";
import AutomobileForm from "./AutomobileForm";
import VehicleList from "./VehicleList";
import AppointmentList from "./AppointmentList";
import AppointmentHistory from "./AppointmentHistory";
import AppointmentForm from "./AppointmentForm";
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
          <Route path="automobiles">
            <Route index element={<AutomobileList />} />
            <Route path="new" element={<AutomobileForm />} />
          </Route>
          <Route path="vehicles">
            <Route index element={<VehicleList />} />
            {/* <Route path="new" element={<AutomobileForm />} /> */}
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
