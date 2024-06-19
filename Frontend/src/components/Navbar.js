import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';

const AppNavbar = ({ userName, onToggleSidebar }) => {
  const navbarStyle = {
    backgroundColor: '#343a', // Background color for the navbar
    padding: '10px 20px', // Adjust padding as needed
    borderBottom: '1px solid #dee2e6', // Optional: Add a bottom border
  };

  return (
    <Navbar expand="md" style={navbarStyle}>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Form className="d-flex">
            <FormControl type="search" placeholder="Search" className="mr-2" aria-label="Search" />
            {/* <Button variant="outline-success"><FontAwesomeIcon icon={faSearch} /></Button> */}
          </Form>
        </Nav>
        <Nav>
          <Nav.Link style={{ color: '#ffffff' }}>Welcome, {userName}</Nav.Link>
        </Nav>
        <Nav>
          <Button variant="outline-light" onClick={onToggleSidebar}><FontAwesomeIcon icon={faBars} /></Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
