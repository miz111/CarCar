import React from "react";
import { Link } from "react-router-dom";

function VehicleColumn(props) {
  return (
    <div className="col" style={{ minWidth: "200px" }}>
      {props.list.map((data) => {
        return (
          <div key={data.href} className="card mb-3 shadow ">
            <img
              src={data.picture_url}
              className="card-img-top"
              style={{ maxHeight: "150px", objectFit: "cover" }}
              alt={data.picture_url}
            />
            <div className="card-body">
              <h5 className="card-title">{data.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {data.manufacturer.name}
              </h6>
            </div>
          </div>
        );
      })}
    </div>
  );
}

class VehicleListPictures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      models: [],
      vehicleColumns: [],
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
        this.setState({ ...data }, () => {
          const vehicleColumns = [[], [], []];
          let i = 0;
          for (const model of this.state.models) {
            vehicleColumns[i].push(model);
            i++;
            if (i > 2) {
              i = 0;
            }
          }
          this.setState({ vehicleColumns: vehicleColumns });
        });
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
          <button type="button" className="btn btn-success btn-md px-4">
            Add vehicle
          </button>
        </Link>
        <Link to="/vehicles">
          <button type="button" className="btn btn-success btn-md px-4 mx-2">
            Switch views
          </button>
        </Link>
        <div className="row mt-4">
          {this.state.vehicleColumns.map((vehicleList, index) => {
            return <VehicleColumn key={index} list={vehicleList} />;
          })}
        </div>
      </div>
    );
  }
}

export default VehicleListPictures;
