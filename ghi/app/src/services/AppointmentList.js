import React from "react";
import { Link } from "react-router-dom";

class AppointmentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterCriteria: "",
      searchTerm: "",
      service_appointments: [],
      service_appointments_copy: [],
    };
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.finishAppointment = this.finishAppointment.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  async deleteAppointment(event) {
    if (window.confirm("Are you sure you want to cancel the appointment?")) {
      const deleteUrl = `http://localhost:8080${event.target.value}`;
      const response = await fetch(deleteUrl, { method: "delete" });
      if (response.ok) {
        await response.json();
        this.componentDidMount();
      }
    }
  }

  async finishAppointment(event) {
    if (window.confirm("Are you sure you want to finish the appointment?")) {
      const finishUrl = `http://localhost:8080${event.target.value}finish/`;
      const fetchConfig = {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(finishUrl, fetchConfig);
      if (response.ok) {
        await response.json();
        this.componentDidMount();
      }
    }
  }

  async handleSearchChange(e) {
    this.setState({ [e.target.id]: e.target.value });
    if (
      this.state.searchTerm &&
      this.state.filterCriteria &&
      this.state.filterCriteria !== "Filter"
    ) {
      if (this.state.filterCriteria === "date") {
        this.setState({
          service_appointments_copy: this.state.service_appointments.filter(
            (x) =>
              new Date(x.date_time)
                .toDateString()
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
          ),
        });
      } else if (this.state.filterCriteria === "time") {
        this.setState({
          service_appointments_copy: this.state.service_appointments.filter(
            (x) =>
              x.date_time
                .substr(11, 5)
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
          ),
        });
      } else if (this.state.filterCriteria === "technician") {
        this.setState({
          service_appointments_copy: this.state.service_appointments.filter(
            (x) =>
              x.technician.name
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
          ),
        });
      } else {
        this.setState({
          service_appointments_copy: this.state.service_appointments.filter(
            (x) =>
              x[this.state.filterCriteria]
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
          ),
        });
      }
    } else {
      this.setState({
        service_appointments_copy: this.state.service_appointments,
      });
    }
  }

  handleFilterChange(e) {
    this.setState({ [e.target.id]: e.target.value });
    this.setState({ searchTerm: "" });
  }

  async componentDidMount() {
    const appointmentsUrl = "http://localhost:8080/api/appointments/";

    try {
      const response = await fetch(appointmentsUrl);
      if (response.ok) {
        const data = await response.json();
        this.setState({ ...data });
        if (this.state.service_appointments_copy) {
          this.setState({
            service_appointments_copy: data.service_appointments,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="">
          <div className="input-group mb-3">
            <select
              className="input-group-text"
              id="filterCriteria"
              onChange={this.handleFilterChange}
            >
              <option>Filter</option>
              <option value="vin">Vin</option>
              <option value="customer_name">Customer name</option>
              <option value="date">Date</option>
              <option value="time">Time</option>
              <option value="technician">Technician</option>
              <option value="reason">Reason</option>
            </select>
            <input
              type="text"
              className="form-control"
              placeholder={`Filter by... ${
                this.state.filterCriteria === "customer_name"
                  ? "customer name"
                  : this.state.filterCriteria
              }`}
              id="searchTerm"
              value={this.state.searchTerm}
              onChange={this.handleSearchChange}
              onKeyUp={this.handleSearchChange}
              onFocus={this.handleSearchChange}
            />
          </div>
        </div>
        <h1>Service appointments</h1>
        <Link to="/appointments/new">
          <button type="button" className="btn btn-success btn-md px-4">
            Add appointment
          </button>
        </Link>
        <Link to="/appointments/history">
          <button type="button" className="btn btn-primary btn-md px-4 mx-2">
            Service history
          </button>
        </Link>
        <Link to="/appointments/filter">
          <button type="button" className="btn btn-secondary btn-md px-4">
            Service history (live filter)
          </button>
        </Link>
        <table className="table table-striped table-hover text-center">
          <thead>
            <tr>
              <th style={{ width: "0px" }}>VIN</th>
              <th>Customer name</th>
              <th style={{ width: "150px" }}>Date</th>
              <th style={{ width: "0px" }}>Time</th>
              <th style={{ width: "0px" }}>Technician</th>
              <th>Reason</th>
              <th style={{ width: "0px", minWidth: "55px" }}></th>
              <th style={{ width: "0px" }}></th>
            </tr>
          </thead>
          <tbody>
            {this.state.service_appointments_copy
              .filter((x) => !x.is_finished)
              .map((service_appointment) => {
                return (
                  <tr
                    key={service_appointment.href}
                    className={
                      service_appointment.vip_treatment
                        ? "align-middle table-warning"
                        : "align-middle"
                    }
                  >
                    <td className="text-uppercase">
                      {service_appointment.vin}
                    </td>
                    <td className="text-capitalize">
                      {service_appointment.customer_name}
                    </td>
                    <td>
                      {new Date(service_appointment.date_time).toDateString()}
                    </td>
                    <td>{service_appointment.date_time.substr(11, 5)}</td>
                    <td className="text-capitalize">
                      {service_appointment.technician.name}
                    </td>
                    <td className="text-capitalize">
                      {service_appointment.reason}
                    </td>
                    <td>
                      <div
                        className={
                          service_appointment.vip_treatment
                            ? "text-warning fw-bold rounded bg-dark bg-gradient py-1"
                            : ""
                        }
                      >
                        {service_appointment.vip_treatment ? "VIP" : ""}
                      </div>
                    </td>
                    <td>
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic example"
                      >
                        <button
                          type="button"
                          onClick={this.deleteAppointment}
                          value={service_appointment.href}
                          className="btn btn-danger fw-bold"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={this.finishAppointment}
                          value={service_appointment.href}
                          className="btn btn-success fw-bold"
                        >
                          Finish
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AppointmentList;
