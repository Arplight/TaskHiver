import { Navigate, Route, Routes } from "react-router-dom";
import Template from "./Template";
import Profile from "./Components/Pages/Profile/Profile";
import Auth from "./Components/Pages/Auth/Auth";
import List from "./Components/Pages/List/List";
import Wrapper from "./Components/Layout/Wrapper/Wrapper";
import Blocker from "./Components/Layout/Blocker/Blocker";
import Footer from "./Components/Layout/Footer/Footer";
import Error from "./Components/Pages/Error/Error";
import Navbar from "./Components/Layout/Navbar/Navbar";
import ProtectedRoute from "./Components/Pages/Protected_Route/ProtectedRoute";
import { useContext } from "react";
import { AuthContext } from "./Context/Auth_Provider/AuthProvider";

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <>
      <Blocker />
      <div className="wrapper container m-auto">
        {isAuthenticated && <Navbar />}
        <Routes>
          <Route path="/" element={<Wrapper />}>
            <Route
              path="auth"
              element={isAuthenticated ? <Navigate to="/list" /> : <Auth />}
            />
            {/* Protected routes */}
            {[
              { component: <Profile />, path: "profile" },
              { component: <List />, path: "list" },
              { component: <Error />, path: "*" },
            ].map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<ProtectedRoute>{route.component}</ProtectedRoute>}
              />
            ))}
          </Route>
        </Routes>
        <Footer />
        {/* <Template /> */}
      </div>
    </>
  );
}

export default App;
