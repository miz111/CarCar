import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function withExtras(Component) {
    return (props) => (
        <Component {...props} params={useParams()} useNavigate={useNavigate()} />
    );
}

class SalesPersonEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.params.name,
            employee_number: this.props.params.employee_number,
            success: false,
            failedAttempt: false,
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmployeeNumberChange = this.handleEmployeeNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        delete data.success;
        delete data.failedAttempt;

        const salesPersonUrl = `http://localhost:8090/api/salesperson/${this.props.params.id}/`;
        const fetchConfig = {
            method: "put",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(salesPersonUrl, fetchConfig);
        if (response.ok) {
            this.setState({ success: true });
            setTimeout(() => {
                this.props.useNavigate("/salesperson");
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

    handleEmployeeNumberChange(event) {
        const value = event.target.value;
        this.setState({ employee_number: value })
    }

    render() {
        let containerClasses = "shadow p-4 mt-4";
        let addedSalesPersonClasses = "d-none";
        if (this.state.success) {
            containerClasses = "d-none";
            addedSalesPersonClasses = "mt-5 container alert alert-success mb-0";
        }
        let failedAttemptClasses = "d-none";
        if (this.state.failedAttempt) {
            failedAttemptClasses = "mt-5 container alert alert-danger mb-0";
        }
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <Link to="/salesperson">
                        <button
                            type="button"
                            className="btn btn-outline-dark btn-md px-4 mt-3"
                        >
                            ↩ Return to sales persons list
                        </button>
                    </Link>
                    <div className={containerClasses}>
                        <h1>Update Sales Person Information</h1>
                        <form onSubmit={this.handleSubmit} id="update-salesperson-form">
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
                                <label htmlFor="name">Sales Person name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    onChange={this.handleEmployeeNumberChange}
                                    value={this.state.employee_number}
                                    placeholder="Employee Number"
                                    required
                                    type="text"
                                    name="employee_number"
                                    id="employee_numbner"
                                    className="form-control"
                                />
                                <label htmlFor="employee_number">Employee Number</label>
                            </div>
                            <button className="btn btn-primary">Edit</button>
                        </form>
                    </div>
                    <div
                        className={addedSalesPersonClasses}
                        id="updated-salesperson-message"
                    >
                        Sales person information has been updated.
                    </div>
                    <div className={failedAttemptClasses} id="failed-attempt-message">
                        Error updating sales person. Each employee number can only be assigned once.
                    </div>
                </div>
            </div>
        )
    }


}
export default withExtras(SalesPersonEdit);
