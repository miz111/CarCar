import React from "react";
import { Link } from "react-router-dom";

class CustomerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      phoneNumber: "",
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    data.phone_number = data.phoneNumber;
    delete data.phoneNumber;

    const customerUrl = "http://localhost:8090/api/customer/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(customerUrl, fetchConfig);
    if (response.ok) {
      const alert = document.getElementById("success-message");
      alert.classList.remove("d-none");
      const error_alert = document.getElementById("error-message");
      error_alert.classList.add("d-none");
      const cleared = {
        name: "",
        address: "",
        phoneNumber: "",
      };
      this.setState(cleared);
    } else {
      const alert = document.getElementById("error-message");
      alert.classList.remove("d-none");
    }
  }
  handleNameChange(event) {
    const value = event.target.value;
    this.setState({ name: value });
  }

  handleAddressChange(event) {
    const value = event.target.value;
    this.setState({ address: value });
  }

  handlePhoneNumberChange(event) {
    const value = event.target.value;
    this.setState({ phoneNumber: value });
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="mt-5 float-right">
            <Link to="/customer">
              <button className="col btn btn-outline-dark btn-rounded">
                {" "}
                ↩ Return to Customer List
              </button>
            </Link>
          </div>
          <div className="shadow p-4 mt-4">
            <h1>Add a Customer</h1>
            <form onSubmit={this.handleSubmit} id="create-customer-form">
              <div className="form-floating mb-3">
                <input
                  value={this.state.name}
                  onChange={this.handleNameChange}
                  placeholder="Customer name"
                  required
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={this.state.address}
                  onChange={this.handleAddressChange}
                  placeholder="Address"
                  required
                  type="text"
                  name="address"
                  id="address"
                  className="form-control"
                />
                <label htmlFor="address">Address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={this.state.phoneNumber}
                  onChange={this.handlePhoneNumberChange}
                  placeholder="Phone Number"
                  required
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  name="phone_number"
                  id="phone_number"
                  className="form-control"
                />
                <label htmlFor="phone_number">Phone Number XXX-XXX-XXXX</label>
              </div>

              <button className="btn btn-dark">Create</button>
            </form>
            <div
              className="mt-5 alert alert-success d-none mb-0"
              id="success-message"
            >
              Customer created!
            </div>
            <div
              className="mt-5 alert alert-danger d-none mb-0"
              id="error-message"
            >
              Failed to add customer. Phone number already in use.
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerForm;
