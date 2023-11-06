import React from "react";
import { Link } from "react-router-dom";

class SalesRecordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      automobile: "",
      salesPerson: "",
      customer: "",
      price: "",
      automobiles: [],
      salesPersons: [],
      customers: [],
      unsoldAutos: [],
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
    delete data.salesPerson;
    data.vin = data.automobile;
    delete data.automobile;
    delete data.automobiles;
    delete data.salesPersons;
    delete data.customers;
    delete data.unsoldAutos;

    const salesRecordUrl = "http://localhost:8090/api/salesrecord/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(salesRecordUrl, fetchConfig);

    const autoUrl = `http://localhost:8100/api/automobiles/${this.state.automobile}/`;
    const fetchConfig1 = {
      method: "put",
      body: JSON.stringify({ is_sold: true }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const updateSold = await fetch(autoUrl, fetchConfig1);

    if (response.ok && updateSold.ok) {
      const alert = document.getElementById("success-message");
      alert.classList.remove("d-none");
      const cleared = {
        price: "",
        automobile: "",
        salesPerson: "",
        customer: "",
      };
      this.setState(cleared);
      this.componentDidMount();
    }
  }
  handleAutomobileChange(event) {
    const value = event.target.value;
    this.setState({ automobile: value });
  }

  handleSalesPersonChange(event) {
    const value = event.target.value;
    this.setState({ salesPerson: value });
  }

  handleCustomerChange(event) {
    const value = event.target.value;
    this.setState({ customer: value });
  }

  handlePriceChange(event) {
    const value = event.target.value;
    this.setState({ price: value });
  }

  async componentDidMount() {
    const url1 = "http://localhost:8100/api/automobiles/";
    const url2 = "http://localhost:8090/api/salesperson/";
    const url3 = "http://localhost:8090/api/customer/";
    const response1 = await fetch(url1);
    const response2 = await fetch(url2);
    const response3 = await fetch(url3);
    if (response1.ok && response2.ok && response3.ok) {
      const data1 = await response1.json();
      const data2 = await response2.json();
      const data3 = await response3.json();
      this.setState({
        automobiles: data1.autos,
        salesPersons: data2.sales_persons,
        customers: data3.customers,
      });
      this.setState({
        unsoldAutos: this.state.automobiles.filter((auto) => {
          return !auto.is_sold;
        }),
      });
    }
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="mt-5 float-right">
            <Link to="/sales-record">
              <button className="col btn btn-outline-dark btn-rounded">
                {" "}
                ↩ Return to Sales History List
              </button>
            </Link>
          </div>
          <div className="shadow p-4 mt-4">
            <h1>Add a New Sales Record</h1>
            <form onSubmit={this.handleSubmit} id="create-sales-record-form">
              <div className="mb-3">
                <select
                  value={this.state.automobile}
                  onChange={this.handleAutomobileChange}
                  required
                  name="automobile"
                  id="automobile"
                  className="form-select"
                >
                  <option value="">Choose an Automobile</option>
                  {this.state.unsoldAutos.map((automobile) => {
                    return (
                      <option key={automobile.id} value={automobile.vin}>
                        {automobile.model.name} ({automobile.year}) -{" "}
                        {automobile.color}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={this.state.price}
                  onChange={this.handlePriceChange}
                  placeholder="Price"
                  required
                  type="number"
                  name="price"
                  id="price"
                  className="form-control"
                />
                <label htmlFor="price">Price</label>
              </div>
              <div className="mb-3">
                <select
                  value={this.state.salesPerson}
                  onChange={this.handleSalesPersonChange}
                  required
                  name="sales_person"
                  id="sales_person"
                  className="form-select"
                >
                  <option value="">Choose a Sales Person</option>
                  {this.state.salesPersons.map((salesPerson) => {
                    return (
                      <option
                        key={salesPerson.id}
                        value={salesPerson.employee_number}
                      >
                        {salesPerson.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="mb-3">
                <select
                  value={this.state.customer}
                  onChange={this.handleCustomerChange}
                  required
                  name="customer"
                  id="customer"
                  className="form-select"
                >
                  <option value="">Choose a Customer</option>
                  {this.state.customers.map((customer) => {
                    return (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button className="btn btn-dark">Create</button>
            </form>
            <div
              className="mt-2 alert alert-success d-none mb-0"
              id="success-message"
            >
              Sales Record created!
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SalesRecordForm;
