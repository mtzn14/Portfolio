import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Button, Table, Dropdown, DropdownButton } from 'react-bootstrap';

const AdminDashboard = (props) => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (props.userdata.username === "") {
            navigate("/");
        } else {
            if (props.userdata.userrole !== "superadmin") {
                navigate("/userdashboard");
            } else {
                fetch("http://localhost/gleowo/admin.php")
                    .then(response => response.json())
                    .then(data => setUsers(data.users))
                    .catch(error => console.error('Error fetching users:', error));
            }
        }
    }, [props.userdata.username, props.userdata.userrole, navigate]);

    const handleUserRoleChange = (username, newRole) => {
        fetch("http://localhost/gleowo/admin.php", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'updateUserRole',
                username: username,
                newRole: newRole
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const updatedUsers = users.map(user =>
                    user.username === username ? { ...user, userrole: newRole } : user
                );
                setUsers(updatedUsers);
            } else {
                console.error('Failed to update user role:', data.error);
            }
        })
        .catch(error => console.error('Error updating user role:', error));
    };

    const handleUserDelete = (username) => {
        fetch("http://localhost/gleowo/admin.php", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'deleteUser',
                username: username,
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const updatedUsers = users.filter(user => user.username !== username);
                setUsers(updatedUsers);
            } else {
                console.error('Failed to delete user:', data.error);
            }
        })
        .catch(error => console.error('Error deleting user:', error));
    };

    return (
        <>
             <div style={{ backgroundColor: "darkcyan", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h1 className="h1-white" style={{ textAlign: "center", padding: "50px 0 50px 0" }}> Admin Dashboard</h1>
            </div>
            
            <div style={{ width: "80%", height:'449px' , margin: "2% 10% 0 10%", display: "flex", justifyContent: "start" }}>
                <h2 className="me-4" style={{ width: "20%", borderRight: "solid 1px" }}>Hello, {props.userdata.firstname}</h2>
                <div style={{ width: "100%" }}>
                    <p className="p-l-black" style={{ fontWeight: "bold" }}>Subscribers list:</p>
                    <Col className='col-10'>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Firstname</th>
                                    <th>Lastname</th>
                                    <th>Email</th>
                                    <th>User Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={ user.username }>
                                        <td>{user.username}</td>
                                        <td>{user.firstname}</td>
                                        <td>{user.lastname}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <DropdownButton
                                                title={user.userrole}
                                                onSelect={(eventKey) => handleUserRoleChange(user.username, eventKey)}
                                            >
                                                <Dropdown.Item eventKey="user">user</Dropdown.Item>
                                                <Dropdown.Item eventKey="superadmin">superadmin</Dropdown.Item>
                                            </DropdownButton>
                                        </td>
                                        <td>
                                            <Button variant="danger" onClick={() => handleUserDelete(user.username)}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;