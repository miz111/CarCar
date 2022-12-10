import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CustomerList = () => {
    const [customers, setCustomer] = useState([])

    const getCustomers = async () => {
        const customersUrl = 'http://localhost:8090/api/customer/';
        const response = await fetch(customersUrl);
        if (response.ok) {
            const data = await response.json();
            setCustomer(data);
        }
    }

    useEffect(() => {
        getCustomers();
    }, [])


    return (
        <>
            <div className="container mt-5">
                <Link to="/customer/new">
                    <button type="button" className="btn btn-success btn-md px-4">Add a Customer</button>
                </Link>

                <table className="table table-striped table-hover text-center">
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Address</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.customers?.map(customer => {
                            return (
                                <tr key={customer.id}>
                                    <td>{customer.name}</td>
                                    <td>{customer.address}</td>
                                    <td>{customer.phone_number}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default CustomerList;
