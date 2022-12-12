import React from 'react';

class SalesHistory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            salesPerson: '',
            salesPersons: [],
            salesRecords: [],
        };
        this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this);
    }

    handleSalesPersonChange(event) {
        const value = event.target.value;
        this.setState({ salesPerson: value }, async () => {
            if (this.state.salesPerson) {
                const response = await fetch(`http://localhost:8090/api/salesperson/${this.state.salesPerson}/salesrecord`);
                if (response.ok) {
                    const data = await response.json();
                    this.setState({ salesRecords: data.sales_records })
                }
            } else {
                this.setState({ salesRecords: []})
            }
        })
    }

    async componentDidMount() {
        const url = 'http://localhost:8090/api/salesperson/'
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({ salesPersons: data.sales_persons });
        }
    }

    render() {
        return (
            <>
                <div className="container mt-5">
                    <h1>Sales Person History</h1>
                    <div className="mb-3">
                        <select value={this.state.salesPerson} onChange={this.handleSalesPersonChange} required name="sales_person" id="sales_person" className="form-select">
                            <option value="">Choose a Sales Person</option>
                            {this.state.salesPersons.map(salesPerson => {
                                return (
                                    <option key={salesPerson.id} value={salesPerson.id}>
                                        {salesPerson.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div>
                        <table className="table table-striped table-hover text-center">
                            <thead>
                                <tr>
                                    <th>Sales Person</th>
                                    <th>Customer</th>
                                    <th>Vin</th>
                                    <th>Sale Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.salesRecords.map(salesRecord => {
                                    return (
                                        <tr key={salesRecord.id}>
                                            <td>{salesRecord.sales_person.name}</td>
                                            <td>{salesRecord.customer.name}</td>
                                            <td>{salesRecord.automobile.vin}</td>
                                            <td>{salesRecord.price}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }
}

export default SalesHistory;
