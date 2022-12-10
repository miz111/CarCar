import React from 'react';

class VehicleForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            picture: '',
            manufacturer: '',
            manufacturers: []
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePictureChange = this.handlePictureChange.bind(this);
        this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        data.picture_url = data.picture;
        data.manufacturer_id = data.manufacturer;
        delete data.manufacturer;
        delete data.picture;
        delete data.manufacturers;

        const vehicleUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(vehicleUrl, fetchConfig)
        if (response.ok) {
            const alert = document.getElementById("success-message");
            alert.classList.remove("d-none");
            const cleared = {
                name: '',
                picture: '',
                manufacturer: ''
            }
            this.setState(cleared);
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value })
    }

    handlePictureChange(event) {
        const value = event.target.value;
        this.setState({ picture: value })
    }

    handleManufacturerChange(event) {
        const value = event.target.value;
        this.setState({ manufacturer: value })
    }

    async componentDidMount() {
        const url = 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({ manufacturers: data.manufacturers });
        }
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Add a Vehicle Model</h1>
                        <form onSubmit={this.handleSubmit} id="create-vehicle-form">
                            <div className="form-floating mb-3">
                                <input value={this.state.name} onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" id="name"
                                    className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.picture} onChange={this.handlePictureChange} placeholder="Picture Url" required type="url" name="picture_url" id="vehicle_url"
                                    className="form-control" />
                                <label htmlFor="color">Picture URL</label>
                            </div>
                            <div className="mb-3">
                                <select value={this.state.manufacturer} onChange={this.handleManufacturerChange} required name="manufacturer_id" id="manufacturer_id" className="form-select">
                                    <option value="">Choose a Manufacturer</option>
                                    {this.state.manufacturers.map(manufacturer => {
                                        return (
                                            <option key={manufacturer.href} value={manufacturer.id}>
                                                {manufacturer.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                        <div className="alert alert-success d-none mb-0" id="success-message">
                            Vehicle added!
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default VehicleForm;
