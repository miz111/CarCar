import { NavLink } from "react-router-dom";


function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <div className="logo-image">
            <img src={require('./img/car-logo.png')} className="img-fluid" />
          </div>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <div className="dropdown">
              <button
                className="btn dropdown-toggle text-white"
                type="button"
                id="dropdownInventoryMenu"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Inventory
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownInventoryMenu"
              >
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/automobiles">
                    Automobiles
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/vehicles">
                    Vehicles
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/manufacturers">
                    Manufacturers
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="dropdown">
              <button
                className="btn dropdown-toggle text-white"
                type="button"
                id="dropdownSalesMenu"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sales
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownSalesMenu">
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/customer">
                    Customers
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/salesperson">
                    Sales Agents
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/sales-history">
                    Sales History
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/sales-record">
                    Sales Records
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="dropdown">
              <button
                className="btn dropdown-toggle text-white"
                type="button"
                id="dropdownServicesMenu"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Services
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownServicesMenu"
              >
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/appointments">
                    Appointments
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="dropdown-item" to="/technicians">
                    Technicians
                  </NavLink>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
