import { Link, Outlet, useLocation } from "react-router-dom";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import ModalWindow from "./ModalWindow";
 


const Main = (props) => {
    const location = useLocation();
    const handleLogout = () =>{
        props.handleuserdata({
            username: "",
            firstname: "",
            lastname: "",
            useremail: "",
            userrole: "user"
        })
    }

    const isActive = (path) => {
        return location.pathname === path ? "current-menu-item" : "";
    };
    return (
        <>
            <header>
                <div className="header-content-wrap">
                    <nav>
                        <div className="nav-left">
                            <img src="/logo1.png" className="logo-icon" alt="GLEOWO small logo icon" />
                            <Link to="/" className={isActive("/")}>Home</Link>
                            <Link to="/products" className={isActive("/products")}>Products</Link>
                            <Link to="/services" className={isActive("/services")}>Services</Link>
                            <Link to="/about" className={isActive("/about")}>About us</Link>
                            <Link to="/faq" className={isActive("/faq")}>Location</Link>
                            
                            
                        </div>
                        {
                            (props.userdata.useremail == "") ? 
                            (
                                <div className="d-flex" id="loginButtonDiv">
                                    <ModalWindow className="get-app-button" handleuserdata={props.handleuserdata}/> 
                                </div>
                            ):(
                                <DropdownButton id="dropdown-basic-button" title={props.userdata.firstname + ' ' + props.userdata.lastname}>
                                    <Dropdown.Item><Link to="/userdashboard">My profile</Link></Dropdown.Item>
                                    
                                    {props.userdata.userrole === "superadmin" && (
                                        <Dropdown.Item><Link to="/admindashboard">Admin dashboard</Link></Dropdown.Item>
                                    )}
                                    
                                    <Dropdown.Divider></Dropdown.Divider>
                                    <Dropdown.Item onClick={ handleLogout }>Logout</Dropdown.Item>
                                </DropdownButton>
                            )
                        }
                    </nav>
                </div>
            </header>     
                     
            <Outlet />
        </>
    );
}
 
export default Main;

