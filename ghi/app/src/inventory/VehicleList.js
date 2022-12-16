import React from "react";
import { Link } from "react-router-dom";

class VehicleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      models: [],
    };
    this.deleteVehicle = this.deleteVehicle.bind(this);
  }

  async deleteVehicle(event) {
    if (window.confirm("Are you sure you want to delete that?")) {
      const deleteUrl = `http://localhost:8100${event.target.value}`;
      const response = await fetch(deleteUrl, { method: "delete" });
      if (response.ok) {
        await response.json();
        this.componentDidMount();
      }
    }
  }

  async componentDidMount() {
    const vehiclesUrl = "http://localhost:8100/api/models/";

    try {
      const response = await fetch(vehiclesUrl);
      if (response.ok) {
        const data = await response.json();
        this.setState({ ...data });
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <div className="container mt-5">
        <h1>Vehicles List</h1>
        <Link to="/vehicles/new">
          <button type="button" className="btn btn-dark btn-md px-4">
            Add vehicle
          </button>
        </Link>
        <Link to="/vehicles/picture-view">
          <button type="button" className="btn btn-outline-dark btn-md px-4 mx-2">
            Switch views
          </button>
        </Link>
        <table className="table table-striped table-hover text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Manufacturer</th>
              <th>Picture</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.models.map((model) => {
              return (
                <tr key={model.href} className="align-middle">
                  <td className="text-capitalize">{model.name}</td>
                  <td className="text-capitalize">{model.manufacturer.name}</td>
                  <td>
                    <img
                      src={model.picture_url}
                      alt={model.name}
                      style={{ maxHeight: "200px", maxWidth: "200px" }}
                    />
                  </td>
                  <td>
                    <button
                      onClick={this.deleteVehicle}
                      value={model.href}
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

export default VehicleList;
