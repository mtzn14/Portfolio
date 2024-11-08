import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Form } from 'react-bootstrap';

const UserDashboard = (props) => {

    const navigate = useNavigate();

    useEffect(() => {
        if(props.userdata.useremail == "") {
            navigate("/");
        }
    });

    const [editing, setEditing] = useState(false);
    const [editedData, setEditedData] = useState({ ...props.userdata });

    const handleEditClick = () => {
        setEditing(true);
    };
    const handleEditClose = () => {
        setEditing(false);
    };
    const handleSaveClick = () => {
        fetch("http://localhost/gleowo/edit.php", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            username: props.userdata.username, 
            email: props.userdata.useremail, 
            newusername: editedData.username,
            newfirstname: editedData.firstname,
            newlastname: editedData.lastname,
            newemail: editedData.useremail
            }),
        })
        .then(response => response.json())
        .then(data => {
            props.handleuserdata({
                username: data.response[0].username,
                firstname: data.response[0].firstname,
                lastname: data.response[0].lastname,
                useremail: data.response[0].email,
                userrole: data.response[0].userrole
            });
            setEditing(false);
        })
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };

    return (
        <>
        
        <div style={{ backgroundColor: "darkcyan", display: "flex", flexDirection: "column", alignItems: "center", }}>
            <h1 className="h1-white" style={{ textAlign: "center", padding: "50px 0 50px 0" }}> User Dashboard</h1>
            </div>
            <div style={{ width: "80%", height:'449px', margin: "2% 10% 0 10%", display: "flex", justifyContent: "start" }}>
            <h2 className="me-4" style={{ width: "20%", borderRight: "solid 1px" }}>Hello, {props.userdata.firstname}</h2>
            <div>
                {editing ? (
                <Form>
                    
                    <Form.Group controlId="formFirstname" className='me-2'>
                    <Form.Label>Firstname:</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstname"
                        value={editedData.firstname}
                        onChange={handleChange}
                    />
                    </Form.Group>
                    <Form.Group controlId="formLastname" className='me-2'>
                    <Form.Label>Lastname:</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastname"  
                        value={editedData.lastname}
                        onChange={handleChange}
                    />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        name="useremail"
                        value={editedData.useremail}  
                        onChange={handleChange}
                    />
                    </Form.Group>
                    <Button variant="success" className='ms-2 me-2' onClick={handleSaveClick}>
                    Save
                    </Button>
                    <Button variant="danger" onClick={handleEditClose}>
                    Close
                    </Button>
                </Form>
                ) : (
                <>
                    <p className="p-l-black" style={{ fontWeight: "bold" }}>Personal information:</p>
                    <p className="p-l-black">Username: {props.userdata.username}</p>
                    <p className="p-l-black">Firstname: {props.userdata.firstname}</p>
                    <p className="p-l-black">Lastname: {props.userdata.lastname}</p>
                    <p className="p-l-black">E-mail: {props.userdata.useremail}</p>
                    <Col className='col-6'>
                    <Button variant="primary" className='form-control' onClick={handleEditClick}>
                        Edit
                    </Button>
                    </Col>
                </>
                )}
            </div>
        </div>
        </>
    );
    };

export default UserDashboard;