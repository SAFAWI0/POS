import AppContainer from "../Contaner/container";

import "./header.css";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="header">
      <AppContainer width={1300}>
        <div className="contentH">
          <h2>POS</h2>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/Categories">Categories</Link>
            </li>
            <li>
              <Link to="/Invoices">Invoices</Link>
            </li>
          </ul>
        </div>
      </AppContainer>
    </div>
  );
};

export default Header;
