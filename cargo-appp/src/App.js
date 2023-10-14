import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import Navigation from "./AdminPanel/Navigation";
import Page1 from "./AdminPanel/Page1";
import Page2 from "./AdminPanel/Page2";
import NoPage from "./NoPage";
import Manager from './Manager/MainManager'

function App() {
  return (
    <BrowserRouter>
      {/* {!localStorage.getItem("key") ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="admin" element={<Page1 />} />
          <Route path="projects" element={<Page2 />} />
        </Routes>
      ) : ( */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<Profile />} />
        {localStorage.getItem("key") == 1 ? (
          <Route path="admin" element={<Page1 />} />
        ) : localStorage.getItem("key") == 3 ? (
          <Route path="manager" element={<Manager />} />
        ) : (
          ""
        )}
        <Route path="projects" element={<Page2 />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      {/* )} */}
    </BrowserRouter>
  );
}

export default App;
