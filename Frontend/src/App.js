// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import CreateUser from './components/CreateUser';
import UserList from './components/UserList';
import AppNavbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <Router>
            <Container fluid>
                <Row>
                    <Col md={2}>
                        <Sidebar isOpen={sidebarOpen} />
                    </Col>
                    <Col md={10}>
                        <AppNavbar userName="Arushirdi" onToggleSidebar={toggleSidebar} />
                        <Routes>
                            <Route path="/create-user" element={<CreateUser />} />
                            <Route path="/user-list" element={<UserList />} />
                        </Routes>
                    </Col>
                </Row>
            </Container>
        </Router>
    );
};

export default App;
