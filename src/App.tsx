import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Welcome } from "./pages/welcome/Welcome";
import Home from "./pages/Home";
import AddEvent from "./pages/AddEvent";

function App() {
  return (
    <div className="bg-gray-900 h-[100vh] text-gray-100 font-roboto tracking-wide">
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add_event" element={<AddEvent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
