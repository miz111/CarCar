import React from 'react';

class ManufacturerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: ''
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };

        const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(manufacturerUrl, fetchConfig)
        if (response.ok) {
            const alert = document.getElementById("success-message");
            alert.classList.remove("d-none");
            const cleared = {
                name: '',
            };
            this.setState(cleared);
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value })
    }

    async componentDedMount() {
        const url = 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            this.setState({ manufacturers: data.manufacturers });
        }
    }

    render() {
        return (<div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a Manufacturer</h1>
                    <form onSubmit={this.handleSubmit} id="create-manufacturer-form">
                        <div className="form-floating mb-3">
                            <input value={this.state.name} onChange={this.handleNameChange} placeholder="Manufacturer name" required type="text" name="name" id="name"
                                className="form-control" />
                            <label htmlFor="name">Name</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                    <div className="alert alert-success d-none mb-0" id="success-message">
                        Manufacturer created!
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default ManufacturerForm;
