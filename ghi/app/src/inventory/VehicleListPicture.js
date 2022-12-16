import React from "react";
import { Link } from "react-router-dom";

function VehicleColumns(props) {
  const vehicleColumns = [[], [], [], []];

  let i = 0;
  for (const model of props.list) {
    vehicleColumns[i].push(model);
    i++;
    if (i > 3) {
      i = 0;
    }
  }

  return (
    <>
      {vehicleColumns.map((vehicleList, index) => {
        return <VehicleColumn key={index} list={vehicleList} />;
      })}
    </>
  );
}

function VehicleColumn(props) {
  return (
    <div className="col" style={{ minWidth: "200px" }}>
      {props.list.map((data) => {
        return (
          <div key={data.href} className="card mb-3 shadow ">
            <img
              src={data.picture_url}
              className="card-img-top"
              style={{ maxHeight: "111px", objectFit: "cover" }}
              alt={data.picture_url}
            />
            <div className="card-body">
              <h5 className="card-title">{data.name}</h5>
            </div>
          </div>
        );
      })}
    </div>
  );
}

class VehicleListPicturesNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      models: [],
      vehicleColumns: [],
      manufacturersList: [],
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
    const manufacturersUrl = "http://localhost:8100/api/manufacturers/";

    try {
      const vehiclesResponse = await fetch(vehiclesUrl);
      const manufacturerResponse = await fetch(manufacturersUrl);
      if (vehiclesResponse.ok && manufacturerResponse.ok) {
        const vehiclesList = await vehiclesResponse.json();
        this.setState({ vehiclesList: vehiclesList.models });
        const manufacturersList = await manufacturerResponse.json();
        this.setState({ manufacturersList: manufacturersList.manufacturers });
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
          {this.state.manufacturersList.map((manufacturer, index) => {
            return (
              <div key={index}>
                <h4>{manufacturer.name}</h4>
                <hr className="hr" />
                <div className="row mt-4">
                  {
                    <VehicleColumns
                      list={this.state.vehiclesList.filter(
                        (x) => x.manufacturer.name === manufacturer.name
                      )}
                    />
                  }
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default VehicleListPicturesNew;
