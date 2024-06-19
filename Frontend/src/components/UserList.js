import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable, usePagination } from 'react-table';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get('http://localhost:3000/users')
            .then(response => {
                const formattedUsers = response.data.map(user => ({
                    ...user,
                    dob: new Date(user.dob).toLocaleDateString()
                }));
                setUsers(formattedUsers);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    };

    const data = React.useMemo(() => users, [users]);

    const columns = React.useMemo(() => [
        {
            Header: 'Name',
            accessor: 'name'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Date of Birth',
            accessor: 'dob'
        },
        {
            Header: 'Actions',
            Cell: ({ row }) => (
                <div className="d-flex justify-content-around">
                    <Button variant="info" size="sm" onClick={() => handleView(row.original)}>
                        <i className="bi bi-eye"></i>
                    </Button>
                    <Button variant="warning" size="sm" onClick={() => handleEdit(row.original)}>
                        <i className="bi bi-pencil"></i>
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(row.original)}>
                        <i className="bi bi-trash"></i>
                    </Button>
                </div>
            )
        }
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state: { pageIndex },
        prepareRow
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 5 }
        },
        usePagination
    );

    const handleView = (user) => {
        setSelectedUser(user);
        setShowViewModal(true);
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };

    const handleDelete = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setSelectedUser(null);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedUser(null);
    };

    const handleCloseViewModal = () => {
        setShowViewModal(false);
        setSelectedUser(null);
    };

    const handleConfirmDelete = () => {
        axios.delete(`http://localhost:3000/users/${selectedUser.id}`)
            .then(response => {
                fetchUsers();
                handleCloseDeleteModal();
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    };












    
    const handleSaveChanges = () => {
        axios.put(`http://localhost:3000/users/${selectedUser.id}`, selectedUser)
            .then(response => {
                fetchUsers();
                handleCloseEditModal();
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="container mt-2">
            <h5>User List</h5>
            <table className="table table-sm table-striped table-bordered" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="d-flex justify-content-between mt-3">
                <Button onClick={() => previousPage()} disabled={!canPreviousPage} size="sm">Previous</Button>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>
                </span>
                <Button onClick={() => nextPage()} disabled={!canNextPage} size="sm">Next</Button>
            </div>

            {/* Edit User Modal */}
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="name" 
                                placeholder="Enter name" 
                                value={selectedUser ? selectedUser.name : ''} 
                                onChange={handleInputChange} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                name="email" 
                                placeholder="Enter email" 
                                value={selectedUser ? selectedUser.email : ''} 
                                onChange={handleInputChange} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDob">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control 
                                type="date" 
                                name="dob" 
                                placeholder="Enter date of birth" 
                                value={selectedUser ? selectedUser.dob : ''} 
                                onChange={handleInputChange} 
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditModal}>Close</Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        <i className="bi bi-save"></i> Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete User Modal */}
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete user "{selectedUser ? selectedUser.name : ''}"?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>Cancel</Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        <i className="bi bi-trash"></i> Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* View User Modal */}
            <Modal show={showViewModal} onHide={handleCloseViewModal}>
                <Modal.Header closeButton>
                    <Modal.Title>View User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><strong>Name:</strong> {selectedUser ? selectedUser.name : ''}</p>
                    <p><strong>Email:</strong> {selectedUser ? selectedUser.email : ''}</p>
                    <p><strong>Date of Birth:</strong> {selectedUser ? selectedUser.dob : ''}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseViewModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UserList;
