import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function withExtras(Component) {
    return (props) => (
        <Component {...props} params={useParams()} useNavigate={useNavigate()} />
    );
}

class CustomerEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.params.name,
            address: this.props.params.address,
            phone_number: this.props.params.phone_number,
            success: false,
            failedAttempt: false,
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        delete data.success;
        delete data.failedAttempt;

        const customerUrl = `http://localhost:8090/api/customer/${this.props.params.id}/`;
        const fetchConfig = {
            method: "put",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(customerUrl, fetchConfig);
        if (response.ok) {
            this.setState({ success: true });
            setTimeout(() => {
                this.props.useNavigate("/customer");
            }, 1000);
        } else {
            this.setState({ failedAttempt: true });
            setTimeout(() => {
                this.setState({ failedAttempt: false });
            }, 2000);
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value })
    }

    handleAddressChange(event) {
        const value = event.target.value;
        this.setState({ address: value })
    }

    handlePhoneNumberChange(event) {
        const value = event.target.value;
        this.setState({ phone_number: value })
    }

    render() {
        let containerClasses = "shadow p-4 mt-4";
        let addedCustomerClasses = "d-none";
        if (this.state.success) {
            containerClasses = "d-none";
            addedCustomerClasses = "mt-5 container alert alert-success mb-0";
        }
        let failedAttemptClasses = "d-none";
        if (this.state.failedAttempt) {
            failedAttemptClasses = "mt-5 container alert alert-danger mb-0";
        }
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <Link to="/customer">
                        <button
                            type="button"
                            className="btn btn-outline-dark btn-md px-4 mt-3"
                        >
                            ↩ Return to customers list
                        </button>
                    </Link>
                    <div className={containerClasses}>
                        <h1>Update Customer Information</h1>
                        <form onSubmit={this.handleSubmit} id="update-customer-form">
                            <div className="form-floating mb-3">
                                <input
                                    onChange={this.handleNameChange}
                                    value={this.state.name}
                                    placeholder="Name"
                                    required
                                    type="text"
                                    name="name"
                                    id="name"
                                    maxLength="200"
                                    className="form-control"
                                />
                                <label htmlFor="name">Customer name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    onChange={this.handleAddressChange}
                                    value={this.state.address}
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
                                    onChange={this.handlePhoneNumberChange}
                                    value={this.state.phone_number}
                                    placeholder="Phone Number"
                                    required
                                    type="text"
                                    name="phone_number"
                                    id="phone_number"
                                    className="form-control"
                                />
                                <label htmlFor="phone_number">Phone Number</label>
                            </div>
                            <button className="btn btn-primary">Edit</button>
                        </form>
                    </div>
                    <div
                        className={addedCustomerClasses}
                        id="updated-customer-message"
                    >
                        Customer information has been updated.
                    </div>
                    <div className={failedAttemptClasses} id="failed-attempt-message">
                        Error updating customer. Each phone number can only be assigned once.
                    </div>
                </div>
            </div>
        );
    }
}

export default withExtras(CustomerEdit);
