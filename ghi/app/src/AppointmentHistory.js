import React from "react";
import { Link } from "react-router-dom";

class AppointmentHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVIN: "",
      service_appointments: [],
      service_appointments_copy: [],
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchVIN = this.handleSearchVIN.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleSearchChange(e) {
    this.setState({ [e.target.id]: e.target.value.toUpperCase() });
  }

  handleSearchVIN(e) {
    if (this.state.searchVIN) {
      this.setState({
        service_appointments_copy: this.state.service_appointments.filter(
          (x) => {
            return x.vin.includes(this.state.searchVIN.toUpperCase());
          }
        ),
      });
    } else {
      this.setState({ service_appointments_copy: [] });
    }
  }

  handleEnter(e) {
    if (e.key === "Enter") {
      this.handleSearchVIN();
    }
  }

  async componentDidMount() {
    const appointmentsUrl = "http://localhost:8080/api/appointments/";
    try {
      const response = await fetch(appointmentsUrl);
      if (response.ok) {
        const data = await response.json();
        this.setState({ ...data });

        setTimeout(() => {
          this.setState({
            service_appointments: this.state.service_appointments.filter(
              (x) => {
                return x.is_finished;
              }
            ),
          });
        }, 100);
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
            <input
              type="text"
              className="form-control"
              placeholder="Search using VIN"
              aria-label="VIN number"
              aria-describedby="basic-addon2"
              id="searchVIN"
              maxLength="17"
              value={this.state.searchVIN}
              onChange={this.handleSearchChange}
              onKeyDown={this.handleEnter}
            />
            <button
              type="button"
              className="input-group-text"
              id="basic-addon2"
              value={this.state.searchVIN}
              onClick={this.handleSearchVIN}
            >
              SEARCH VIN
            </button>
          </div>
        </div>
        <h1>Service appointments history</h1>
        <Link to="/appointments">
          <button type="button" className="btn btn-secondary btn-md px-4">
            ↩ Return to appointment list
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
            </tr>
          </thead>
          <tbody>
            {this.state.service_appointments_copy.map((service_appointment) => {
              return (
                <tr key={service_appointment.href} className="align-middle">
                  <td className="text-uppercase">{service_appointment.vin}</td>
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AppointmentHistory;
