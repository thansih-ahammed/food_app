import { createContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Nav from "./Components/Includes/Nav";
import AddRecipie from "./Components/Screens/AddRecipie";
import Foods from "./Components/Screens/Foods";
import Login from "./Components/Screens/Login";
import NoMatch from "./Components/Screens/NoMatch";
import PreLoader from "./Components/Screens/PreLoader/PreLoader";
import Signup from "./Components/Screens/Signup";
import SingleFood from "./Components/Screens/SingleFood";
import UpdateRecipie from "./Components/Screens/UpdateRecipie";

export const UserContext = createContext();
function App() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const updateUserData = (action) => {
    switch (action.type) {
      case "LOGOUT":
        setUserData(null);
        localStorage.clear();
        break;
      case "LOGIN":
        setUserData(action.payload);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("user_data")));
    setLoading(false);
  }, []);
  return loading ? (
    <PreLoader />
  ) : (
    <>
      <UserContext.Provider value={{ userData, updateUserData }}>
        <Router>
          <Nav />
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/auth/login/" element={<Login />} />}
            />
            <Route exact path="/home" element={<Foods />} />
            <Route exact path="/home/add/" element={<AddRecipie />} />
            <Route exact path="/description/:id" element={<SingleFood />} />
            <Route path="/auth/login/" exact element={<Login />} />
            <Route path="/auth/register/" exact element={<Signup />} />
            <Route
              path="/description/:id/update/:ID"
              element={<UpdateRecipie />}
            />
            <Route exact path="*" element={<NoMatch />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
