// Navbar.js
import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
const padding = {
    
    padding: '10px' // Adjust the padding as per your requirement
};
const AppNavbar = ({ userName, onToggleSidebar }) => {
    return (
        <Navbar  expand="md" style={padding}>
            {/* <Navbar.Brand href="#"></Navbar.Brand> */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Form className="d-flex">
                        <FormControl type="search" placeholder="Search" className="mr-2" aria-label="Search" />
                        <Button variant="outline-success"><FontAwesomeIcon icon={faSearch} /></Button>
                    </Form>
                </Nav>
                <Nav>
                    <Nav.Link>Welcome, {userName}</Nav.Link>
                </Nav>
                <Nav>
                    <Button variant="outline-dark" onClick={onToggleSidebar}><FontAwesomeIcon icon={faBars} /></Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};
export default AppNavbar;
