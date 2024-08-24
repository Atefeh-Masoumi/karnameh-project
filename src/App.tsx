
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import DashBoard from './components/Dashboard'
import UserDetails from "./components/UserDetails";


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/user/:userId" element={<UserDetails />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
