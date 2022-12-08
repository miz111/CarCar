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

    useEffect(() => {
        getSalesPersons();
    }, [])

    return (
        <>
            <div className="container mt-5">
                <Link to="/salesperson/new">
                    <button type="button" className="btn btn-success btn-md px-4">Add a Sales Person</button>
                </Link>

                <table className="table table-striped table-hover text-center">
                    <thead>
                        <tr>
                            <th>Sales Person</th>
                            <th>Employee Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales_persons.sales_persons?.map(sales_person => {
                            return (
                                <tr key={sales_person.id}>
                                    <td>{sales_person.name}</td>
                                    <td>{sales_person.employee_number}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>

    )
}
export default SalesPersonList;
