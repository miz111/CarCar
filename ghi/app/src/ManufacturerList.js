import React, { useState, useEffect } from "react";

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
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
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
        </>
    )
}

export default ManufacturerList;
