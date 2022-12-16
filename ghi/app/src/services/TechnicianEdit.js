import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function withExtras(Component) {
  return (props) => (
    <Component {...props} params={useParams()} useNavigate={useNavigate()} />
  );
}

class TechnicianEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.params.name,
      employee_number: this.props.params.employee_number,
      success: false,
      failedAttempt: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {
      name: this.state.name,
      employee_number: this.state.employee_number,
    };
    const techniciansUrl = `http://localhost:8080/api/technicians/${this.props.params.id}/`;
    const fetchConfig = {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(techniciansUrl, fetchConfig);
    if (response.ok) {
      this.setState({ success: true });
      setTimeout(() => {
        this.props.useNavigate("/technicians");
      }, 1000);
    } else {
      this.setState({ failedAttempt: true });
      setTimeout(() => {
        this.setState({ failedAttempt: false });
      }, 2000);
    }
  }

  handleInputChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  render() {
    let containerClasses = "shadow p-4 mt-4";
    let addedTechniciansClasses = "d-none";
    if (this.state.success) {
      containerClasses = "d-none";
      addedTechniciansClasses = "mt-5 container alert alert-success mb-0";
    }
    let failedAttemptClasses = "d-none";
    if (this.state.failedAttempt) {
      failedAttemptClasses = "mt-5 container alert alert-danger mb-0";
    }

    return (
      <div className="row">
        <div className="offset-3 col-6">
          <Link to="/technicians">
            <button
              type="button"
              className="btn btn-secondary btn-md px-4 mt-3"
            >
              ↩ Return to technicians list
            </button>
          </Link>
          <div className={containerClasses}>
            <h1>Update a technician</h1>
            <form onSubmit={this.handleSubmit} id="update-technician-form">
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleInputChange}
                  value={this.state.name}
                  placeholder="Name"
                  required
                  type="text"
                  name="name"
                  id="name"
                  maxLength="200"
                  className="form-control"
                />
                <label htmlFor="name">Employee name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleInputChange}
                  value={this.state.employee_number}
                  placeholder="Employee number"
                  required
                  type="number"
                  name="employee_number"
                  id="employee_number"
                  className="form-control"
                  min="0"
                  max="2147483647"
                />
                <label htmlFor="employee_number">Employee number</label>
              </div>
              <button className="btn btn-primary">Edit</button>
            </form>
          </div>
          <div
            className={addedTechniciansClasses}
            id="updated-technician-message"
          >
            The technician has been updated.
          </div>
          <div className={failedAttemptClasses} id="failed-attempt-message">
            Failed to update the technician... there may be a technician with
            that employee number already...
          </div>
        </div>
      </div>
    );
  }
}

export default withExtras(TechnicianEdit);
