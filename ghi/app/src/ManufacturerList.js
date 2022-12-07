import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ManufacturerList = () => {
    const [manufacturers, setManufacturers] = useState([])

    const getManufacturers = async () => {
        const manufacturersUrl = 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(manufacturersUrl);
        if (response.ok) {
            const data = await response.json();
            setManufacturers(data);
        }
    }

    useEffect(() => {
        getManufacturers();
    }, [])


    return (
        <>
            <div className="container mt-5">
                <Link to="/manufacturer/new">
                    <button type="button" className="btn btn-success btn-md px-4">Add Manufacturer</button>
                </Link>

                <table className="table table-striped table-hover text-center">
                    <thead>
                        <tr>
                            <th>Manufacturers</th>
                        </tr>
                    </thead>
                    <tbody>
                        {manufacturers.manufacturers?.map(manufacturer => {
                            return (
                                <tr key={manufacturer.id}>
                                    <td>{manufacturer.name}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ManufacturerList;
