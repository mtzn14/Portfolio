import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Main from "./Components/Main";
import Products from "./Components/Products";
import ErrorPage from "./Components/ErrorPage";
import Home from "./Components/Home";
import UserDashboard from "./Components/UserDashboard";
import AdminDashboard from "./Components/AdminDashboard";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Services from "./Components/Services";

function App() {

  const [userData, setUserData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    useremail: "",
    userrole: "user"
  });

  const handleChangeUserData = (data) => { 
    setUserData(data);
  };

  useEffect(() => {
    const storedUserData = sessionStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      sessionStorage.setItem('userData', JSON.stringify(userData));
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [userData]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main userdata={userData} handleuserdata={handleChangeUserData} />} >
          <Route index element={<Home userdata={userData}/>} />
          <Route path="products" element={<Products userdata={userData}/>} />
          <Route path="services" element={<Services userdata={userData}/>} />
          <Route path="userdashboard" element={<UserDashboard userdata={userData} handleuserdata={handleChangeUserData}/>} />
          <Route path="admindashboard" element={<AdminDashboard userdata={userData}/>} />
          <Route path="about" element={<About userdata={userData}/>} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
    
  );
}

export default App;
