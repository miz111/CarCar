import React from 'react';
// import CurrencyInput from '../components/CurrencyInput'

class SalesRecordForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            automobile: '',
            salesPerson: '',
            customer: '',
            price: '',
            automobiles: [],
            salesPersons: [],
            customers: [],
        };
        this.handleAutomobileChange = this.handleAutomobileChange.bind(this);
        this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        data.sales_person = data.salesPerson;
        data.vin = data.automobile;
        delete data.automobile;
        delete data.salesPerson;
        delete data.automobiles;
        delete data.salesPersons;
        delete data.customers;

        const salesRecordUrl = 'http://localhost:8090/api/salesrecord/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        console.log(data);
        const response = await fetch(salesRecordUrl, fetchConfig)
        if (response.ok) {
            const alert = document.getElementById("success-message");
            alert.classList.remove("d-none");
            const cleared = {
                price: '',
                automobile: '',
                salesPerson: '',
                customer: ''
            };
            this.setState(cleared);
        }
    }
    handleAutomobileChange(event) {
        const value = event.target.value;
        this.setState({ automobile: value })
    }

    handleSalesPersonChange(event) {
        const value = event.target.value;
        this.setState({ salesPerson: value })
    }

    handleCustomerChange(event) {
        const value = event.target.value;
        this.setState({ customer: value })
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

    // async componentDidMount() {
    //     const url = 'http://localhost:8090/api/salesperson/'
    //     const response = await fetch(url);
    //     if (response.ok) {
    //         const data = await response.json();
    //         this.setState({ salesPersons: data.salesPerson })
    //     }
    // }

    // async componentDidMount() {
    //     const url = 'http://localhost:8090/api/customer/'
    //     const response = await fetch(url);
    //     if (response.ok) {
    //         const data = await response.json();
    //         this.setState({ customers: data.customers })
    //     }
    // }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Add a New Sales Record</h1>
                        <form onSubmit={this.handleSubmit} id="create-sales-record-form">
                            <div className="mb-3">
                                <select value={this.state.automobile} onChange={this.handleAutomobileChange} required name="automobile" id="automobile" className="form-select">
                                    <option value="">Choose an Automobile</option>
                                    {this.state.automobiles.map(automobile => {
                                        return (
                                            <option key={automobile.id} value={automobile.vin}>
                                                {automobile.model.name}
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
                                <select value={this.state.salesPerson} onChange={this.handleSalesPersonChange} required name="sales_person" id="sales_person" className="form-select">
                                    <option value="">Choose a Sales Person</option>
                                    {this.state.salesPersons.map(salesPerson => {
                                        return (
                                            <option key={salesPerson.id} value={salesPerson.employee_number}>
                                                {salesPerson.name}
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
                            <button className="btn btn-primary">Create</button>
                        </form>
                        <div className="alert alert-success d-none mb-0" id="success-message">
                            Sales Record created!
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SalesRecordForm;
