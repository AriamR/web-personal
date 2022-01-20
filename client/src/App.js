import './App.css';
import {BrowserRouter as Router,Routes,Route,Navigate  } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookingCar  from "./pages/BookingCar";
import UserBooking  from "./pages/UserBooking";
import AddCar from './pages/AddCar';
import AdminHome from './pages/AdminHome';
import Edit from './pages/Edit';
import "antd/dist/antd.css"

function App() {
  return (
    <Router>
       <Routes>
          <Route path='/' element={<Home/>}/> 
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/booking/:carid" element={<BookingCar />}></Route>
          <Route path="/userbooking" element={<UserBooking />}></Route> 
          <Route path="/addcar" element={<AddCar />}></Route>   
          <Route path="/admin" element={<AdminHome />}></Route>   
          <Route path="/edit/:carid" element={<Edit />}></Route>
       </Routes>
    </Router>
  );
}

export default App;

export function ProtectedRoute(props){

  if(localStorage.getItem("user")){
    return(
     
        <Route {...props}></Route>

    )

  }else{
    return <Navigate to="/login"/>
  }
}