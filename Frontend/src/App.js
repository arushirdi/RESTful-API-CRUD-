import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const App = () => {
    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <h4 className="text-center">User Management System</h4>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md={4}>
                    <CreateUser />
                </Col>
                <Col md={8}>
                    <UserList />
                </Col>
            </Row>
        </Container>
    );
};

export default App;
