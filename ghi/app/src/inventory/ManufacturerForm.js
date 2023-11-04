import React from "react";
import { Link } from "react-router-dom";

class ManufacturerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      success: false,
      failedAttempt: false,
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {
      name: this.state.name,
    };
    const manufacturerUrl = "http://localhost:8100/api/manufacturers/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(manufacturerUrl, fetchConfig);
    if (response.ok) {
      const cleared = {
        name: "",
        success: true,
        failedAttempt: false,
      };
      this.setState(cleared);
      setTimeout(() => {
        this.setState({ success: false });
      }, 2000);
    } else {
      this.setState({ failedAttempt: true });
      setTimeout(() => {
        this.setState({ failedAttempt: false });
      }, 3000);
    }
  }

  handleNameChange(event) {
    const value = event.target.value;
    this.setState({ name: value });
  }

  async componentDedMount() {
    const url = "http://localhost:8100/api/manufacturers/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ manufacturers: data.manufacturers });
    }
  }

  render() {
    let addedManufacturerClasses = "d-none";
    if (this.state.success) {
      addedManufacturerClasses = "mt-5 container alert alert-success mb-0";
    }
    let failedAttemptClasses = "d-none";
    if (this.state.failedAttempt) {
      failedAttemptClasses = "mt-5 container alert alert-danger mb-0";
    }

    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="mt-5 float-right">
            <Link to="/manufacturers">
              <button className="col btn btn-outline-dark btn-rounded">
                ↩ Return to all Manufacturers
              </button>
            </Link>
          </div>
          <div className="shadow p-4 mt-4">
            <h1>Create a Manufacturer</h1>
            <form onSubmit={this.handleSubmit} id="create-manufacturer-form">
              <div className="form-floating mb-3">
                <input
                  value={this.state.name}
                  onChange={this.handleNameChange}
                  placeholder="Manufacturer name"
                  required
                  type="text"
                  name="name"
                  id="name"
                  maxLength={100}
                  className="form-control"
                />
                <label htmlFor="name">Name</label>
              </div>
              <button className="btn btn-dark">Create</button>
            </form>
          </div>
          <div
            className={addedManufacturerClasses}
            id="added-manufacturer-message"
          >
            The manufacturer has been added.
          </div>
          <div className={failedAttemptClasses} id="failed-attempt-message">
            Failed to add the manufacturer...
          </div>
        </div>
      </div>
    );
  }
}

export default ManufacturerForm;
