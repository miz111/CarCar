import React from "react";

class VehicleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      picture_url: "",
      manufacturer_id: "",
      manufacturers: [],
      success: false,
      failedAttempt: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {
      name: this.state.name,
      picture_url: this.state.picture_url,
      manufacturer_id: this.state.manufacturer_id,
    };
    const vehicleUrl = "http://localhost:8100/api/models/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(vehicleUrl, fetchConfig);
    if (response.ok) {
      const cleared = {
        name: "",
        picture_url: "",
        manufacturer_id: "",
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

  handleInputChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  async componentDidMount() {
    const url = "http://localhost:8100/api/manufacturers/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ manufacturers: data.manufacturers });
    }
  }

  render() {
    let addedVehicleClasses = "d-none";
    if (this.state.success) {
      addedVehicleClasses = "mt-5 container alert alert-success mb-0";
    }
    let failedAttemptClasses = "d-none";
    if (this.state.failedAttempt) {
      failedAttemptClasses = "mt-5 container alert alert-danger mb-0";
    }

    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a Vehicle Model</h1>
            <form onSubmit={this.handleSubmit} id="create-vehicle-form">
              <div className="form-floating mb-3">
                <input
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  placeholder="Name"
                  required
                  type="text"
                  name="name"
                  id="name"
                  maxLength={100}
                  className="form-control"
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  value={this.state.picture_url}
                  onChange={this.handleInputChange}
                  placeholder="Picture URL"
                  required
                  type="url"
                  name="picture_url"
                  id="picture_url"
                  className="form-control"
                />
                <label htmlFor="picture_url">Picture URL</label>
              </div>
              <div className="mb-3">
                <select
                  value={this.state.manufacturer_id}
                  onChange={this.handleInputChange}
                  required
                  name="manufacturer_id"
                  id="manufacturer_id"
                  className="form-select"
                >
                  <option value="">Choose a Manufacturer</option>
                  {this.state.manufacturers.map((manufacturer) => {
                    return (
                      <option key={manufacturer.href} value={manufacturer.id}>
                        {manufacturer.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button className="btn btn-dark">Create</button>
            </form>
          </div>
          <div className={addedVehicleClasses} id="added-vehicle-message">
            The vehicle has been added.
          </div>
          <div className={failedAttemptClasses} id="failed-attempt-message">
            Failed to add the vehicle... the picture URL specified may not be
            longer than 200 characters...
          </div>
        </div>
      </div>
    );
  }
}

export default VehicleForm;
