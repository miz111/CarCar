import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SalesList = () => {
  const [sales_records, setSales] = useState([]);

  const getSales = async () => {
    const salesUrl = "http://localhost:8090/api/salesrecord/";
    const response = await fetch(salesUrl);
    if (response.ok) {
      const data = await response.json();
      setSales(data);
    }
  };

  useEffect(() => {
    getSales();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <h1>Sales Records List</h1>
        <Link to="/sales-record/new">
          <button type="button" className="btn btn-dark btn-md px-4">
            Add Sales Record
          </button>
        </Link>

        <table className="table table-striped table-hover text-center">
          <thead>
            <tr>
              <th>Sales Person</th>
              <th>Employee Number</th>
              <th>Purchaser Name</th>
              <th>Automobile VIN</th>
              <th>Price</th>
              <th style={{ width: "5px" }}></th>
            </tr>
          </thead>
          <tbody>
            {sales_records.sales_records?.map((sales_record) => {
              return (
                <tr key={sales_record.id}>
                  <td>{sales_record.sales_person.name}</td>
                  <td>{sales_record.sales_person.employee_number}</td>
                  <td>{sales_record.customer.name}</td>
                  <td>{sales_record.automobile.vin}</td>
                  <td>{sales_record.price}</td>
                  <td>
                    <Link
                      to={`/sales-record/edit/${sales_record.id}/${sales_record.sales_person.id}/${sales_record.customer.id}/${sales_record.automobile.id}/${sales_record.price}`}
                    >
                      <button className="btn btn-outline-dark fw-bold">
                        Edit
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SalesList;
