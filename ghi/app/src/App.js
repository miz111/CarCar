import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerForm from './ManufacturerForm'
import ManufacturerList from './ManufacturerList'
import VehicleForm from './VehicleForm'
import SalesPersonForm from './SalesPersonForm'
import CustomerForm from './CustomerForm'
import SalesRecordForm from './SalesRecordForm'
import SalesList from './SalesList'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturer">
            <Route path="" element={<ManufacturerList />} />
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
          <Route path="vehicle" element={<VehicleForm />} />
          <Route path="salesperson">
            <Route path="" element={<SalesPersonForm />} />
            <Route path="new" element={<SalesPersonForm />} />
          </Route>
          <Route path="customer">
            <Route path="" element={<SalesPersonForm />} />
            <Route path="new" element={<CustomerForm />} />
          </Route>
          <Route path="sales-record">
            <Route path="" element={<SalesList />} />
            <Route path="new" element={<SalesRecordForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
