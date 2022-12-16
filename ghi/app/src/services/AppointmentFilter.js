import React from "react";
import { Link } from "react-router-dom";

class AppointmentFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchVIN: "",
      service_appointments: [],
      service_appointments_copy: [],
      noMatch: false,
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(e) {
    this.setState({ searchVIN: e.target.value.toUpperCase() }, () => {
      this.setState(
        {
          service_appointments_copy: this.state.service_appointments.filter(
            (x) => x.vin.includes(this.state.searchVIN)
          ),
        },
        () => {
          if (this.state.service_appointments_copy.length === 0) {
            this.setState({ noMatch: true });
          } else {
            this.setState({ noMatch: false });
          }
        }
      );
    });
  }

  async componentDidMount() {
    const appointmentsUrl = "http://localhost:8080/api/appointments/";
    try {
      const response = await fetch(appointmentsUrl);
      if (response.ok) {
        const data = await response.json();
        this.setState({ ...data }, () => {
          this.setState(
            {
              service_appointments: this.state.service_appointments.filter(
                (x) => {
                  return x.is_finished;
                }
              ),
            },
            () => {
              this.setState({
                service_appointments_copy: this.state.service_appointments,
              });
            }
          );
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    let noMatchClasses = "d-none";
    let hideTableClasses = "table table-striped table-hover text-center";
    if (this.state.noMatch) {
      noMatchClasses = "mt-5 container alert alert-danger mb-0";
      hideTableClasses = "d-none";
    }

    return (
      <div className="container mt-5">
        <div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search using VIN"
              aria-label="VIN number"
              aria-describedby="searchvin-input"
              id="searchVIN"
              maxLength="17"
              value={this.state.searchVIN}
              onChange={this.handleSearchChange}
            />
            <button
              type="button"
              className="input-group-text"
              id="searchvin-input"
              value={this.state.searchVIN}
              onClick={this.handleSearchChange}
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
        <table className={hideTableClasses}>
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
        <div className={noMatchClasses}>
          There are no appointments that match the VIN you provided...
        </div>
      </div>
    );
  }
}

export default AppointmentFilter;
