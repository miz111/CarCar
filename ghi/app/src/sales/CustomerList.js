import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CustomerList = () => {
  const [customers, setCustomer] = useState([]);

  const getCustomers = async () => {
    const customersUrl = "http://localhost:8090/api/customer/";
    const response = await fetch(customersUrl);
    if (response.ok) {
      const data = await response.json();
      setCustomer(data);
    }
  };

  const deleteCustomer = async (id) => {
    const url = `http://localhost:8090/api/customer/${id}/`;
    const fetchConfig = {
      method: "delete",
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const alert = document.getElementById("success-message");
      alert.classList.remove("d-none");
      getCustomers();
      const data = await response.json();
    } else {
      const alert = document.getElementById("failure-message");
      alert.classList.remove("d-none");
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <h1>Customers List</h1>
        <Link to="/customer/new">
          <button type="button" className="btn btn-dark btn-md px-4">
            Add a Customer
          </button>
        </Link>

        <table className="table table-striped table-hover text-center">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th style={{ width: "5px" }}></th>
              <th style={{ width: "5px" }}></th>
            </tr>
          </thead>
          <tbody>
            {customers.customers?.map((customer) => {
              return (
                <tr key={customer.id}>
                  <td>{customer.name}</td>
                  <td>{customer.address}</td>
                  <td>{customer.phone_number}</td>
                  <td>
                    <Link
                      to={`/customer/edit/${customer.id}/${customer.name}/${customer.address}/${customer.phone_number}`}
                    >
                      <button className="btn btn-outline-dark fw-bold">
                        Edit
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-danger fw-bold"
                      onClick={() => deleteCustomer(customer.id)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div
          className="mt-5 alert alert-success d-none mb-0"
          id="success-message"
        >
          The customer has been deleted.
        </div>
        <div
          className="mt-5 alert alert-danger d-none mb-0"
          id="failure-message"
        >
          Error deleting customer; customer may have existing sales record and
          cannot be removed from the system.
        </div>
      </div>
    </>
  );
};
export default CustomerList;
