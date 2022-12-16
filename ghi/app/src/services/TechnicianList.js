import React from "react";
import { Link } from "react-router-dom";

class TechnicianList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      technicians: [],
      success: false,
      failedAttempt: false,
    };
    this.deleteTechnician = this.deleteTechnician.bind(this);
  }

  async deleteTechnician(event) {
    if (window.confirm("Are you sure you want to delete that?")) {
      const deleteUrl = `http://localhost:8080${event.target.value}`;
      const response = await fetch(deleteUrl, { method: "delete" });
      if (response.ok) {
        const cleared = {
          success: true,
          failedAttempt: false,
        };
        this.setState(cleared);

        setTimeout(() => {
          this.setState({ success: false });
        }, 2000);

        this.componentDidMount();
      } else {
        this.setState({ failedAttempt: true });
        setTimeout(() => {
          this.setState({ failedAttempt: false });
        }, 2000);
      }
    }
  }

  async componentDidMount() {
    const techniciansUrl = "http://localhost:8080/api/technicians/";

    try {
      const response = await fetch(techniciansUrl);
      if (response.ok) {
        const data = await response.json();
        this.setState({ ...data });
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    let deletedTechnicianClasses = "d-none";
    if (this.state.success) {
      deletedTechnicianClasses = "mt-5 container alert alert-success mb-0";
    }
    let failedAttemptClasses = "d-none";
    if (this.state.failedAttempt) {
      failedAttemptClasses = "mt-5 container alert alert-danger mb-0";
    }

    return (
      <div className="container col-7 mt-5">
        <h1>Technicians List</h1>
        <Link to="/technicians/new">
          <button type="button" className="btn btn-dark btn-md px-4">
            Add technician
          </button>
        </Link>
        <div className={deletedTechnicianClasses} id="added-technician-message">
          The technician has been deleted.
        </div>
        <div className={failedAttemptClasses} id="failed-attempt-message">
          That technician cannot be deleted likely because they have a service appointment history.
        </div>
        <table className="table table-striped table-hover text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th style={{ width: "0px", minWidth: "175px" }}>
                Employee number
              </th>
              <th style={{ width: "0px" }}></th>
              <th style={{ width: "0px" }}></th>
            </tr>
          </thead>
          <tbody>
            {this.state.technicians.map((technician) => {
              return (
                <tr key={technician.href} className="align-middle">
                  <td>{technician.name}</td>
                  <td>{technician.employee_number}</td>
                  <td><Link to={`/technicians/edit/${technician.id}/${technician.employee_number}/${technician.name}`}>
                    <button className="btn btn-outline-dark fw-bold">
                      Edit
                    </button>
                  </Link></td>
                  <td>
                    <button
                      onClick={this.deleteTechnician}
                      value={technician.href}
                      className="btn btn-outline-danger fw-bold"
                    >
                      X
                    </button>
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

export default TechnicianList;
