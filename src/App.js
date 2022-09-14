import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./Screens/Welcome";
import Form from "./Screens/Form";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;
