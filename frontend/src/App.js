import { BrowserRouter, Route, Routes } from "react-router-dom";
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Header from "./Components/Header";

function App() {
  return (
    <>
      <BrowserRouter>
      <div className="container">
        <Header></Header>
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/" element={<Dashboard />}></Route>
        </Routes>
      </div>
      </BrowserRouter>
      <ToastContainer />
    </>
    

  );
}

export default App;
