import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import Home from "./pages/home/Home";
import Notfound from "./pages/Nofound/Notfound";
import { useSelector } from "react-redux";
import Account from "./pages/account/Account";
import { LinkedInCallback } from "react-linkedin-login-oauth2";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const user = useSelector((state) => state.user.token);
  const user_linkedin_token = useSelector(state => state.user.accessToken)
  console.log(user);

  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route
            path='/'
            element={user_linkedin_token ? <LinkedinCallback /> : <Navigate to={"/login"} />} 
          />
          <Route
            path="/home"
            element={user ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to={"/home"} />}
          />
          <Route
            path="/register"
            element={!user ? <Signup /> : <Navigate to={"/home"} />}
          />
          <Route path="/account" element={<Account />} />

          <Route path="*" element={<Notfound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
