import React from "react";

class AutomobileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "",
      year: "",
      vin: "",
      model_id: "",
      models: [],
      success: false,
      failedAttempt: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {
      color: this.state.color,
      year: this.state.year,
      vin: this.state.vin,
      model_id: this.state.model_id,
    };
    const automobilesUrl = `http://localhost:8100/api/automobiles/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(automobilesUrl, fetchConfig);
    if (response.ok) {
      const cleared = {
        color: "",
        year: "",
        vin: "",
        model_id: "",
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
    const url = "http://localhost:8100/api/models/";

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      this.setState({ models: data.models });
    }
  }

  render() {
    let addedAutomobilesClasses = "d-none";
    if (this.state.success) {
      addedAutomobilesClasses = "mt-5 container alert alert-success mb-0";
    }
    let failedAttemptClasses = "d-none";
    if (this.state.failedAttempt) {
      failedAttemptClasses = "mt-5 container alert alert-danger mb-0";
    }

    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add an automobile to inventory</h1>
            <form onSubmit={this.handleSubmit} id="create-automobile-form">
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleInputChange}
                  value={this.state.color}
                  placeholder="Color"
                  required
                  type="text"
                  name="color"
                  id="color"
                  className="form-control"
                />
                <label htmlFor="name">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleInputChange}
                  value={this.state.year}
                  placeholder="Year"
                  required
                  type="text"
                  name="year"
                  id="year"
                  className="form-control"
                />
                <label htmlFor="model_name">Year</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleInputChange}
                  value={this.state.vin}
                  placeholder="Vin"
                  type="text"
                  name="vin"
                  id="vin"
                  minLength="17"
                  maxLength="17"
                  className="form-control"
                />
                <label htmlFor="color">Vin</label>
              </div>
              <div className="mb-3">
                <select
                  onChange={this.handleInputChange}
                  value={this.state.model_id}
                  required
                  name="model_id"
                  id="model_id"
                  className="form-select"
                >
                  <option value="">Choose a model</option>
                  {this.state.models.map((model) => {
                    return (
                      <option key={model.id} value={model.id}>
                        {model.manufacturer.name} {model.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <button className="btn btn-primary">Create</button>
            </form>
          </div>
          <div
            className={addedAutomobilesClasses}
            id="added-automobile-message"
          >
            The automobile has been added.
          </div>
          <div className={failedAttemptClasses} id="failed-attempt-message">
            Failed to add the automobile... it is possible that there is already
            a similar VIN number in the system...
          </div>
        </div>
      </div>
    );
  }
}

export default AutomobileForm;
