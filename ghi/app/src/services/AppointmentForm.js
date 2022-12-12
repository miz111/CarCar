import React from "react";
import { Link } from "react-router-dom";

class AppointmentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vin: "",
      customer_name: "",
      date: "",
      time: "",
      reason: "",
      technician: "",
      technicians: [],
      success: false,
      failedAttempt: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    data.date_time = `${this.state.date} ${this.state.time}`;
    delete data.date;
    delete data.time;
    delete data.technicians;
    delete data.success;
    delete data.failedAttempt;

    const appointmentUrl = "http://localhost:8080/api/appointments/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(appointmentUrl, fetchConfig);
    if (response.ok) {
      const cleared = {
        vin: "",
        customer_name: "",
        date: "",
        time: "",
        reason: "",
        technician: "",
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
      }, 1000);
    }
  }

  handleInputChange(event) {
    this.setState({ [event.target.id]: event.target.value });
    if (event.target.id === "vin") {
      setTimeout(() => {
        this.setState({ vin: this.state.vin.toUpperCase() });
      }, 1);
    }
    if (event.target.id === "time") {
      setTimeout(() => {
        const mins =
          Math.floor(parseInt(this.state.time.substring(3)) / 15) * 15;
        this.setState({
          time: `${this.state.time.substring(0, 3)}${mins ? mins : "00"}`,
        });
      }, 1);
    }
  }

  async componentDidMount() {
    const url = "http://localhost:8080/api/technicians/";

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      this.setState({ technicians: data.technicians });
    }
  }

  render() {
    let addedTechniciansClasses = "d-none";
    if (this.state.success) {
      addedTechniciansClasses = "mt-5 container alert alert-success mb-0";
    }
    let failedAttemptClasses = "d-none";
    if (this.state.failedAttempt) {
      failedAttemptClasses = "mt-5 container alert alert-danger mb-0";
    }

    return (
      <div className="row">
        <div className="offset-3 col-6">
          <Link to="/appointments">
            <button
              type="button"
              className="btn btn-secondary btn-md px-4 mt-3"
            >
              ↩ Return to appointments list
            </button>
          </Link>
          <div className="shadow p-4 mt-4">
            <h1>Add an appointment</h1>
            <form onSubmit={this.handleSubmit} id="create-appointment-form">
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleInputChange}
                  value={this.state.vin}
                  placeholder="Vin"
                  type="text"
                  name="vin"
                  id="vin"
                  minLength={17}
                  maxLength={17}
                  className="form-control"
                />
                <label htmlFor="vin">Vin</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleInputChange}
                  value={this.state.customer_name}
                  placeholder="Customer name"
                  required
                  type="text"
                  name="customer_name"
                  id="customer_name"
                  maxLength="200"
                  className="form-control"
                />
                <label htmlFor="customer_name">Customer name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleInputChange}
                  value={this.state.date}
                  placeholder="Date"
                  required
                  type="date"
                  name="date"
                  id="date"
                  // min={new Date(Date.now()).toLocaleDateString()}
                  className="form-control"
                />
                <label htmlFor="date">Date</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleInputChange}
                  value={this.state.time}
                  placeholder="Time"
                  required
                  type="time"
                  name="time"
                  id="time"
                  min="07:00"
                  max="19:00"
                  step="900"
                  className="form-control"
                />
                <label htmlFor="time">Time</label>
              </div>
              <div className="mb-3">
                <select
                  onChange={this.handleInputChange}
                  value={this.state.technician}
                  required
                  name="technician"
                  id="technician"
                  className="form-select"
                >
                  <option value="">Choose a technician</option>
                  {this.state.technicians.map((technician) => {
                    return (
                      <option
                        key={technician.employee_number}
                        value={technician.employee_number}
                      >
                        {technician.name} (ID#{technician.employee_number})
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleInputChange}
                  value={this.state.reason}
                  placeholder="Reason"
                  required
                  type="text"
                  name="reason"
                  id="reason"
                  maxLength="200"
                  className="form-control"
                />
                <label htmlFor="reason">Reason</label>
              </div>

              <button className="btn btn-primary">Create</button>
            </form>
          </div>
          <div
            className={addedTechniciansClasses}
            id="added-appointment-message"
          >
            The appointment has been added.
          </div>
          <div className={failedAttemptClasses} id="failed-attempt-message">
            Failed to add the appointment...
          </div>
        </div>
      </div>
    );
  }
}

export default AppointmentForm;
