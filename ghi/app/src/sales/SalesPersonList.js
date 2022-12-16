import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SalesPersonList = () => {
    const [sales_persons, setSalesPerson] = useState([])

    const getSalesPersons = async () => {
        const salesPersonUrl = 'http://localhost:8090/api/salesperson/';
        const response = await fetch(salesPersonUrl);
        if (response.ok) {
            const data = await response.json();
            setSalesPerson(data);
        }
    }

    const deleteSalesPerson = async (id) => {
        const url = (`http://localhost:8090/api/salesperson/${id}/`)
        const fetchConfig = {
            method: "delete",
        }
        const response = await fetch(url, fetchConfig)
        if (response.ok) {
            const alert = document.getElementById("success-message");
            alert.classList.remove("d-none");
            getSalesPersons();
            const data = await response.json()
        } else {
            const alert = document.getElementById("failure-message");
            alert.classList.remove("d-none");
        }
    }


    useEffect(() => {
        getSalesPersons();
    }, [])

    return (
        <>
            <div className="container mt-5">
                <Link to="/salesperson/new">
                    <button type="button" className="btn btn-dark btn-md px-4">Add a Sales Person</button>
                </Link>

                <table className="table table-striped table-hover text-center">
                    <thead>
                        <tr>
                            <th>Sales Person</th>
                            <th>Employee Number</th>
                            <th style={{ width: "5px" }}></th>
                            <th style={{ width: "5px" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales_persons.sales_persons?.map(sales_person => {
                            return (
                                <tr key={sales_person.id}>
                                    <td>{sales_person.name}</td>
                                    <td>{sales_person.employee_number}</td>
                                    <td><Link to={`/salesperson/edit/${sales_person.id}/${sales_person.name}/${sales_person.employee_number}`}>
                                        <button className="btn btn-outline-dark fw-bold">
                                            Edit
                                        </button>
                                    </Link></td>
                                    <td><button type="button" className="btn btn-outline-danger fw-bold" onClick={() => deleteSalesPerson(sales_person.id)}>X</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="mt-5 alert alert-success d-none mb-0" id="success-message">
                    The sales person has been deleted.
                </div>
                <div className="mt-5 alert alert-danger d-none mb-0" id="failure-message">
                    Error deleting sales person; sales person may have existing sales record and cannot be removed from the system.
                </div>
            </div>
        </>

    )
}
export default SalesPersonList;
