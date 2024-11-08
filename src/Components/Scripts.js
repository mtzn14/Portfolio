import { Modal } from "react-bootstrap";

const getCookie = (cookieName) => {
    let cname = cookieName + "=";
    let decodeCookie = decodeURIComponent(document.cookie);
    let ca = decodeCookie.split(";");
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while(c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if(c.indexOf(cname) == 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

const handleLogout = () => {
    let requestOptions = {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({
            action: "logout"
        })
    };
    fetch("http://localhost/gleowo/logout.php", requestOptions)
        .then(response => response.json())
        .then(data => {
            if(data.logout === "ok") {
                let logoutButtonDiv = document.getElementById("loginButtonDiv");
                logoutButtonDiv.innerHTML = (
                    <>
                    <a className="btn btn-primary" data-bs-toggle="modal" href="#loginModal" role="button">
                        <i className="fa-solid fa-right-to-bracket"></i>
                        Login
                    </a>
                    </>
                );
                let aul = document.getElementById("authorisedUser");
                aul.style.display = 'none';
                aul = document.getElementById("admins");
                aul.style.display = 'none';
                window.location = "http://localhost:3000/homepage";
            }
        })             
}

const handleLogin = () => {
    let username = document.getElementById("username").value;
    let password = document.getElementById("loginPassword").value;
    if(username.length < 1 || password.length < 1) {
        document.getElementById("errorLogin").innerText = "There was an error in login process!";
        setTimeout(() => {
            document.getElementById("errorLogin").innerText = "";
        }, 3000);
    }
    else {
        let requestOptions = {
            method: "POST",
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify({
                uname: username,
                pwd: password
            })
        };
        fetch("http://localhost/gleowo/login.php", requestOptions)
            .then(response => response.json())
            .then(data => {
                    if(data.isError == false) {
                        sessionStorage.setItem("user", JSON.stringify(data));
                        sessionStorage.setItem("userLogged", true);
                        document.getElementById("loginEmail").value = "";
                        document.getElementById("loginPassword").value = "";
                        document.getElementById("errorLogin").classList.remove("text-danger");
                        document.getElementById("errorLogin").classList.add("text-success");
                        document.getElementById("errorLogin").innerText = "Login successfull!";
                        setTimeout(() => {
                            document.getElementById("errorLogin").innerText = "";
                            let myModal = document.getElementById("loginModal");
                            let refModal = Modal.getInstance(myModal);
                            refModal.hide();
                            document.getElementById("errorLogin").classList.remove("text-success");
                            document.getElementById("errorLogin").classList.add("text-danger");
                            let loginButtonDiv = document.getElementById("loginButtonDiv");
                            loginButtonDiv.innerHTML = (
                                <>
                                <a className="btn btn-success me-2" href="cart.html"><span className="fa-solid fa-cart-shopping"></span> Cart <span className="badge bg-primary" id="cartbadge"></span></a>
                                <div className="dropdown me-3">
                                    <button className="btn btn-primary dropdown-toggle" type="button" id="usercontrolbutton" aria-expanded="false" data-bs-toggle="dropdown">
                                        ${data.user}
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="usercontrolbutton">
                                        <li>
                                            <a href="" className="dropdown-item">My profile</a>
                                        </li>
                                        <li>
                                            <a href="history.html" className="dropdown-item" onclick="handleHistory()">History</a>
                                        </li>
                                        <li>
                                            <a href="" className="dropdown-item" onclick="handleLogout()">Logout</a>
                                        </li>
                                    </ul>
                                </div>
                                </>
                        );
                        }, 3000);
                    }
                    else {
                        document.getElementById("errorLogin").classList.remove("text-success");
                        document.getElementById("errorLogin").classList.add("text-danger");
                        document.getElementById("errorLogin").innerText = "Login failed!";
                        setTimeout(() => {
                            document.getElementById("errorLogin").innerText = "";
                        }, 3000);
                    }
                });
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
        let userData = {
            fname: firstname,
            lname: lastname,
            uemail: useremail,
            uname: username,
            upwd: userpassword1
        };
        let requestOptions = {
            method: "POST",
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify(userData)
        };
        fetch("http://localhost/gleowo/api/register.php", requestOptions)
         .then(response => response.json())
         .then(data => {
            if(data.isError == false) {
                document.getElementById("errorRegister").classList.remove("text-danger");
                document.getElementById("errorRegister").classList.add("text-success");
                document.getElementById("errorRegister").innerText = "Register successfull!";
                document.getElementById("firstname").value = "";
                document.getElementById("lastname").value = "";
                document.getElementById("useremail").value = "";
                document.getElementById("username").value = "";
                document.getElementById("userpass").value = "";
                document.getElementById("userpass2").value = "";
                setTimeout(() => {
                    document.getElementById("errorRegister").classList.remove("text-success");
                    document.getElementById("errorRegister").classList.add("text-danger");
                    document.getElementById("errorRegister").innerText = "";
                    let myModal = document.getElementById("registerModal");
                    let refModal = Modal.getInstance(myModal);
                    refModal.hide();
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

export {getCookie, handleLogin, handleRegister, handleLogout};