import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function withExtras(Component) {
    return (props) => (
        <Component {...props} params={useParams()} useNavigate={useNavigate()} />
    );
}

class SalesRecordEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sales_person: this.props.params.sales_person,
            customer: this.props.params.customer,
            automobile: this.props.params.automobile,
            price: this.props.params.price,
            automobiles: [],
            salesPersons: [],
            customers: [],
            success: false,
            failedAttempt: false,
        };
        this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handleAutomobileChange = this.handleAutomobileChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        delete data.success;
        delete data.failedAttempt;
        delete data.automobiles;
        delete data.salesPersons;
        delete data.customers;


        const salesRecordUrl = `http://localhost:8090/api/salesrecord/${this.props.params.id}/`;
        const fetchConfig = {
            method: "put",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(salesRecordUrl, fetchConfig);
        if (response.ok) {
            this.setState({ success: true });
            setTimeout(() => {
                this.props.useNavigate("/sales-record");
            }, 1000);
        } else {
            this.setState({ failedAttempt: true });
            setTimeout(() => {
                this.setState({ failedAttempt: false });
            }, 2000);
        }
    }

    handleSalesPersonChange(event) {
        const value = event.target.value;
        this.setState({ sales_person: value })
    }

    handleCustomerChange(event) {
        const value = event.target.value;
        this.setState({ customer: value })
    }

    handleAutomobileChange(event) {
        const value = event.target.value;
        this.setState({ automobile: value })
    }

    handlePriceChange(event) {
        const value = event.target.value;
        this.setState({ price: value })
    }

    async componentDidMount() {
        const url1 = 'http://localhost:8100/api/automobiles/'
        const url2 = 'http://localhost:8090/api/salesperson/'
        const url3 = 'http://localhost:8090/api/customer/'
        const response1 = await fetch(url1);
        const response2 = await fetch(url2);
        const response3 = await fetch(url3);
        if (response1.ok && response2.ok && response3.ok) {
            const data1 = await response1.json();
            const data2 = await response2.json();
            const data3 = await response3.json();
            this.setState({ automobiles: data1.autos, salesPersons: data2.sales_persons, customers: data3.customers });
        }
    }

    render() {
        let containerClasses = "shadow p-4 mt-4";
        let addedSalesRecordClasses = "d-none";
        if (this.state.success) {
            containerClasses = "d-none";
            addedSalesRecordClasses = "mt-5 container alert alert-success mb-0";
        }
        let failedAttemptClasses = "d-none";
        if (this.state.failedAttempt) {
            failedAttemptClasses = "mt-5 container alert alert-danger mb-0";
        }
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <Link to="/sales-record">
                        <button
                            type="button"
                            className="btn btn-outline-dark btn-md px-4 mt-3"
                        >
                            ↩ Return to sales record list
                        </button>
                    </Link>
                    <div className={containerClasses}>
                        <h1>Update Sales Record Information</h1>
                        <form onSubmit={this.handleSubmit} id="update-salesrecord-form">
                            <div className="mb-3">
                                <select value={this.state.automobile} onChange={this.handleAutomobileChange} required name="automobile" id="automobile" className="form-select">
                                    <option value="">Choose an Automobile</option>
                                    {this.state.automobiles.map(automobile => {
                                        return (
                                            <option key={automobile.id} value={automobile.id}>
                                                {automobile.model.name} - {automobile.vin}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.price} onChange={this.handlePriceChange} placeholder="Price" required type="text" name="price" id="price"
                                    className="form-control" />
                                <label htmlFor="price">Price</label>
                            </div>
                            <div className="mb-3">
                                <select value={this.state.sales_person} onChange={this.handleSalesPersonChange} required name="sales_person" id="sales_person" className="form-select">
                                    <option value="">Choose a Sales Person</option>
                                    {this.state.salesPersons.map(sales_person => {
                                        return (
                                            <option key={sales_person.id} value={sales_person.id}>
                                                {sales_person.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select value={this.state.customer} onChange={this.handleCustomerChange} required name="customer" id="customer" className="form-select">
                                    <option value="">Choose a Customer</option>
                                    {this.state.customers.map(customer => {
                                        return (
                                            <option key={customer.id} value={customer.id}>
                                                {customer.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-dark">Edit</button>
                        </form>
                    </div>
                    <div
                        className={addedSalesRecordClasses}
                        id="updated-salesrecord-message"
                    >
                        Sales Record has been updated.
                    </div>
                    <div className={failedAttemptClasses} id="failed-attempt-message">
                        Error updating sales record.
                    </div>
                </div>
            </div>
        );
    }
}

export default withExtras(SalesRecordEdit);
