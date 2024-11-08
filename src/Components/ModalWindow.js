import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



const ModalWindow = (props) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleCloseLogin = () => {
              setShowLogin(false);
              handleClearUserData();
            }
  const handleShowLogin = () => {
                setShowRegister(false);
                handleClearUserData();
                setShowLogin(true);
            }

  const handleCloseRegister = () => {
                    setShowRegister(false);
                    handleClearUserData();
                  };
  const handleShowRegister = () => {
                    setShowLogin(false);
                    handleClearUserData();
                    setShowRegister(true);
                };
  
  const navigate = useNavigate();
  
  const [userpass, setUserpass] = useState("");
  const [userpass2, setUserpass2] = useState("");

  const [userData, setUserData] = useState({
      username: "",
      firstname: "",
      lastname: "",
      useremail: "",
      userrole: "user"
  });

  const handleChangeUserData = (ev) => {
      const { name, value } = ev.target;
      setUserData((curentValue) => {
          return {
              ...curentValue,
              [name]: value
          };
      });
  }

  const handleClearUserData = () => {
    setUserData({
        username: "",
        firstname: "",
        lastname: "",
        useremail: "",
        userrole: "user"
    });
    setUserpass("");
    setUserpass2("");
  }   

  const handleLogin = () => {
    if(userData.username.length >= 3 && userpass.length >= 3) {
        const reqOpt = {
            method:     "POST",
            headers:    {'Content-Type': 'application/json'},
            body:       JSON.stringify({username: userData.username, pwd: userpass})
        }
        fetch("http://localhost/gleowo/login.php", reqOpt)
            .then(res => res.json())
            .then(data => {
                if(data.response != "Error") {
                    setUserData({
                        username: data.response[0].username,
                        firstname: data.response[0].firstname,
                        lastname: data.response[0].lastname,
                        useremail: data.response[0].email,
                        userrole: data.response[0].userrole
                    });
                    props.handleuserdata({
                        username: data.response[0].username,
                        firstname: data.response[0].firstname,
                        lastname: data.response[0].lastname,
                        useremail: data.response[0].email,
                        userrole: data.response[0].userrole
                    })
                    navigate("/");
                }
                else {
                    handleCloseLogin();
                    navigate("*");
                    handleClearUserData();
                }
            })
    }else{
          document.getElementById("errorLogin").innerText = "There was an error in login process!";
            setTimeout(() => {
                document.getElementById("errorLogin").innerText = "";
            }, 3000);
    }
}

const handleRegister = () => {
  let errorMsg = "";
  let firstname = document.getElementById("firstname").value;
  let lastname = document.getElementById("lastname").value;
  let useremail = document.getElementById("useremail").value;
  let username = document.getElementById("username").value;
  let userpassword1 = document.getElementById("userpass").value;
  let userpassword2 = document.getElementById("userpass2").value;
  if(firstname.length < 1) {
      errorMsg += "First name field is empty. ";
  }
  if(lastname.length < 1) {
      errorMsg += "Last name field is empty. "
  }
  if(useremail.length < 1) {
      errorMsg += "Email field is empty. "
  }
  if(username.length < 1) {
      errorMsg += "Username field is empty. "
  }
  if(userpassword1.length < 1) {
      errorMsg += "Password field is empty. "
  }
  if(userpassword2.length < 1) {
      errorMsg += "Repeat password field is empty. "
  }
  if(userpassword1 != userpassword2) {
      errorMsg += "Password and Repeat password fields must have identical values!";
  }
  if(errorMsg.length < 1) {
      let requestOptions = {
          method: "POST",
          headers: { "Content-Type":"application/json",
                     "Accept": "application/json" 
                    },
          body: JSON.stringify({fname: userData.firstname, lname: userData.lastname, useremail: userData.useremail, username: userData.username, pwd: userpass })
      };
      fetch("http://localhost/gleowo/register.php", requestOptions)
       .then(response => response.json())
       .then(data => {
          console.log(data + " ," + data.status + " " + data.message);
          if(data.status != "Error") {
              document.getElementById("errorRegister").classList.remove("text-danger");
              document.getElementById("errorRegister").classList.add("text-success");
              document.getElementById("errorRegister").innerText = "Registration successful";
              handleClearUserData();
              setTimeout(() => {
                  document.getElementById("errorRegister").classList.remove("text-success");
                  document.getElementById("errorRegister").classList.add("text-danger");
                  document.getElementById("errorRegister").innerText = "";
                  handleCloseRegister();
              }, 3000);
          }
          else{
            document.getElementById("errorRegister").innerText = "There was an error in registering process: " + data.message;
            setTimeout(() => {
                document.getElementById("errorRegister").innerText = "";
            }, 3000);
          }
        });
  }
  else {
      document.getElementById("errorRegister").innerText = "There was an error in registering process: " + errorMsg;
      setTimeout(() => {
          document.getElementById("errorRegister").innerText = "";
      }, 3000);
  }  
}

  return (
    <>
      <Modal size="lg" show={showLogin} onHide={handleCloseLogin} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <h5 id="errorLogin" className="text-danger"></h5>
              <Form.Floating className="mb-3">
                <Form.Control type="text" id="username" placeholder="Username" name='username' value={ userData.username } onChange={ (e) => handleChangeUserData(e) }/>
                <label htmlFor="username">Username</label>
              </Form.Floating>
              <Form.Floating className="mb-3">
                <Form.Control type="password" id="userpass" placeholder="Password" name='userpass' value={ userpass } onChange={ (e) => setUserpass(e.target.value) }/>
                <label htmlFor="userpass">Password</label>
              </Form.Floating>
            </Col>
          </Row>
          <Row className="align-middle">
            <Col>
              If you are not registered click button
              <Button className='ms-2' variant="light" onClick={handleShowRegister}>
                Register
              </Button>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Col>
              <Button className="me-2" variant="success" onClick={handleLogin}>
                Login
              </Button>
              <Button variant="danger" onClick={handleCloseLogin}>
                Close
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>

      <Modal size="lg" show={showRegister} onHide={handleCloseRegister} centered>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Floating className="mb-3">
                <Form.Control type="text" id="firstname" placeholder="First name" name='firstname' value={ userData.firstname } onChange={ (e) => handleChangeUserData(e) }/>
                <label htmlFor="firstname">First name</label>
              </Form.Floating>
              <Form.Floating className="mb-3">
                <Form.Control type="text" id="lastname" placeholder="Last name" name='lastname' value={ userData.lastname } onChange={ (e) => handleChangeUserData(e) }/>
                <label htmlFor="lastname">Last name</label>
              </Form.Floating>
              <Form.Floating className="mb-3">
                <Form.Control type="email" id="useremail" placeholder="E-mail" name='useremail' value={ userData.useremail } onChange={ (e) => handleChangeUserData(e) }/>
                <label htmlFor="useremail">E-mail</label>
              </Form.Floating>
              <Form.Floating className="mb-3">
                <Form.Control type="text" id="username" placeholder="Username" name='username' value={ userData.username } onChange={ (e) => handleChangeUserData(e) }/>
                <label htmlFor="username">Username</label>
              </Form.Floating>
              <Form.Floating className="mb-3">
                <Form.Control type="password" id="userpass" placeholder="Password" name='userpass' value={ userpass } onChange={ (e) => setUserpass(e.target.value) } />
                <label htmlFor="userpass">Password</label>
              </Form.Floating>
              <Form.Floating className="mb-3">
                <Form.Control type="password" id="userpass2" placeholder="Repeat password" name='userpass2' value={ userpass2 } onChange={ (e) => setUserpass2(e.target.value) }/>
                <label htmlFor="userpass2">Repeat password</label>
              </Form.Floating>
              <h5 id="errorRegister" className="text-danger"></h5>
            </Col>
          </Row>
          <Row className="align-middle">
            <Col>
              If you are already registered click button to 
              <Button className='ms-2' variant="light" onClick={handleShowLogin}>
                Login
              </Button>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Row>
            <Col>
              <Button className='me-2' variant="success" onClick={handleRegister}>
                Register
              </Button>
              <Button variant="danger" onClick={handleCloseRegister}>
                Close
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>

      <Button className="btn btn-primary get-app-button" style={{ borderWidth:0 }} variant="primary" onClick={handleShowLogin}>
        Login
      </Button>

    </>
  );
};

export default ModalWindow;
