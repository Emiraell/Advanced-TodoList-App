import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Welcome } from "./pages/welcome/Welcome";
import Home from "./pages/Home";
import AddEvent from "./pages/AddEvent";
import Notifications from "./pages/Notifications";

function App() {
  return (
    <div className=" text-gray-100 font-roboto tracking-wide">
      {/* Application pages */}
      <Router>
        <Routes>
          <Route path="/advanced_todolist_app" element={<Welcome />} />
          <Route path="/advanced_todolist_app/home" element={<Home />} />
          <Route
            path="/advanced_todolist_app/add_event"
            element={<AddEvent />}
          />
          <Route
            path="/advanced_todolist_app/notifications"
            element={<Notifications />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
