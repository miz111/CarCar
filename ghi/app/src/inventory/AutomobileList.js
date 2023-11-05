import React from "react";
import { Link } from "react-router-dom";

class AutomobileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autos: [],
    };
    this.deleteAutomobile = this.deleteAutomobile.bind(this);
  }

  async deleteAutomobile(event) {
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
    const automobilesUrl = "http://localhost:8100/api/automobiles/";

    try {
      const response = await fetch(automobilesUrl);
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
        <h1>Automobiles List</h1>
        <Link to="/automobiles/new">
          <button type="button" className="btn btn-dark btn-md px-4">
            Add automobile
          </button>
        </Link>
        <table className="table table-striped table-hover text-center">
          <thead>
            <tr>
              <th>VIN</th>
              <th>Color</th>
              <th>Year</th>
              <th>Model</th>
              <th>Manufacturer</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.autos.map((auto) => {
              return (
                <tr key={auto.href} className="align-middle">
                  <td className="text-uppercase">{auto.vin}</td>
                  <td className="text-capitalize">{auto.color}</td>
                  <td>{auto.year}</td>
                  <td className="text-capitalize">{auto.model.name}</td>
                  <td className="text-capitalize">
                    {auto.model.manufacturer.name}
                  </td>
                  {(() => {
                    switch (auto.is_sold) {
                      case true:
                        return <td className="text-capitalize">Sold</td>;
                      case false:
                        return <td className="text-capitalize">Available</td>;
                      default:
                        return (
                          <td className="text-capitalize">
                            Check with manager
                          </td>
                        );
                    }
                  })()}
                  <td>
                    <button
                      onClick={this.deleteAutomobile}
                      value={auto.href}
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

export default AutomobileList;
