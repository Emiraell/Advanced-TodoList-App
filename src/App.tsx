import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Welcome } from "./pages/welcome/Welcome";
import Home from "./pages/Home";
import AddEvent from "./pages/AddEvent";
import Notifications from "./pages/Notifications";

function App() {
  return (
    <div className=" text-gray-100 font-roboto tracking-wide">
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add_event" element={<AddEvent />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
