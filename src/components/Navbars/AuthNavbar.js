/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { Link } from "react-router-dom";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

const AdminNavbar = () => {
  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container className="px-4">
          <NavbarBrand to="/" tag={Link}>
            <div
              style={{
                display: "flex",
                color: "white",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem"
              }}
            >
              <img
                style={{ height: "50px" }}
                alt="..."
                // src={require("../../assets/img/brand/argon-react-white.png")}
                src={require("../../assets/img/brand/New Wave logo.jpg")}
              />
              <h3 style={{ color: "white" }}>
                {" "}
                <strong>New Wave Technologies</strong>
              </h3>
            </div>
          </NavbarBrand>
          <button className="navbar-toggler" id="navbar-collapse-main">
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
            <div className="navbar-collapse-header d-md-none">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/">
                    {/* <img
                      alt="..."
                      src={require("../../assets/img/brand/argon-react.png")}
                    /> */}
                    <div
                      style={{
                        display: "flex",
                        color: "white",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "1rem"
                      }}
                    >
                      <img
                        style={{ height: "50px" }}
                        alt="..."
                        src={require("../../assets/img/brand/New Wave logo.jpg")}
                      />
                      <h3 style={{ color: "black" }}>
                        {" "}
                        <strong>NWT</strong>
                      </h3>
                    </div>
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar-collapse-main">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="ml-auto" navbar>
              {/* <NavItem>
                <NavLink
                  className="nav-link-icon"
                  to="/admin/dashboard"
                  tag={Link}
                >
                  <i className="ni ni-planet" />
                  <span className="nav-link-inner--text">Dashboard</span>
                </NavLink>
              </NavItem> */}
              <NavItem>
                <NavLink
                  className="nav-link-icon"
                  to="/auth/register"
                  tag={Link}
                >
                  <i className="ni ni-circle-08" />
                  <span className="nav-link-inner--text">Register</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link-icon" to="/auth/login" tag={Link}>
                  <i className="ni ni-key-25" />
                  <span className="nav-link-inner--text">Login</span>
                </NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink
                  className="nav-link-icon"
                  to="/admin/user-profile"
                  tag={Link}
                >
                  <i className="ni ni-single-02" />
                  <span className="nav-link-inner--text">Profile</span>
                </NavLink>
              </NavItem> */}
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
