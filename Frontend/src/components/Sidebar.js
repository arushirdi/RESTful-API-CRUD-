// Sidebar.js
import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Nav className="col-md-2 d-none d-md-block sidebar">
      <div className="sidebar-sticky">
        <h1></h1>
      </div>
      <Nav.Item>
        <Nav.Link as={Link} to="/create-user">
          Create User
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/user-list">
          User List
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Sidebar;
