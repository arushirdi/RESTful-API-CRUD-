import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Sidebar = () => {
  return (
    <Nav className="col-md-2 d-none d-md-block sidebar">
      <div className="sidebar-sticky">
        
      </div>
      <Nav.Item>
        <Nav.Link as={Link} to="/create-user" className="nav-link link-dark">
          Create User
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/user-list" className="nav-link link-dark">
          User List
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Sidebar;
