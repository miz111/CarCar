import React from 'react';

class SalesPersonForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            employeeNumber: '',
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmployeeNumberChange = this.handleEmployeeNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        data.employee_number = data.employeeNumber;
        delete data.employeeNumber;

        const salesPersonUrl = 'http://localhost:8090/api/salesperson/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(salesPersonUrl, fetchConfig)
        if (response.ok) {
            const alert = document.getElementById("success-message");
            alert.classList.remove("d-none");
            const cleared = {
                name: '',
                employeeNumber: ''
            };
            this.setState(cleared);
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({ name: value })
    }

    handleEmployeeNumberChange(event) {
        const value = event.target.value;
        this.setState({ employeeNumber: value })
    }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Add a New Sales Person</h1>
                        <form onSubmit={this.handleSubmit} id="create-hat-form">
                            <div className="form-floating mb-3">
                                <input value={this.state.name} onChange={this.handleNameChange} placeholder="Style" required type="text" name="name" id="name"
                                    className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.employeeNumber} onChange={this.handleEmployeeNumberChange} placeholder="Employee Number" required type="text" name="employee_number" id="employee_number"
                                    className="form-control" />
                                <label htmlFor="color">Employee Number</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                        <div className="alert alert-success d-none mb-0" id="success-message">
                            Sales Person Added!
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SalesPersonForm;
