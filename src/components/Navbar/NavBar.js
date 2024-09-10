import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

const NavLinks = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm px-5">
      <Navbar.Brand as={NavLink} to="/" className="font-weight-bold">
        RouteGaurd
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link className="text-underline" as={NavLink} exact to="/">
            Home
          </Nav.Link>
          <Nav.Link className="text-underline" as={NavLink} to="/about">
            About
          </Nav.Link>
          <Nav.Link className="text-underline" as={NavLink} to="/service">
            Services
          </Nav.Link>
          {token && (  <Nav.Link className="text-underline" as={NavLink} to="/admin-dashBoard">
            Admin Dashboard
          </Nav.Link>)}
          {role && token && (
            <NavDropdown title="Registration" id="registration-dropdown">
              {role == "superAdmin"  && (
                <NavDropdown.Item className="text-underline" as={NavLink} to="/admin/registration">
                  Admin Registration
                </NavDropdown.Item>
              )}
              <NavDropdown.Item className="text-underline" as={NavLink} to="/customer/register">
                Customer Registration
              </NavDropdown.Item>
              <NavDropdown.Item className="text-underline" as={NavLink} to="/driver/register">
                Driver Registration
              </NavDropdown.Item>
            </NavDropdown>
          )}

          {role && token ? (
            <Nav.Link className="text-underline" as={NavLink} onClick={logout} to="/">
              Logout
            </Nav.Link>
          ) : (
            <NavDropdown title="Login" id="Login-dropdown">
              {
                <NavDropdown.Item className="text-underline" as={NavLink} to="/superAdmin/login">
                  SuperAdminLogin
                </NavDropdown.Item>
              }
              <NavDropdown.Item className="text-underline" as={NavLink} to="/Admin/login">
                AdminLogin
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavLinks;
