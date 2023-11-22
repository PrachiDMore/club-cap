import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import { AuthContextProvider } from './context/Auth';
import Users from './pages/Users';
import Packages from './pages/Packages';

function App() {
  return (
    <>
      <Router>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users" element={<Users />} />
            <Route path="/packages" element={<Packages />} />
          </Routes>
        </AuthContextProvider>
      </Router>
    </>
  );
}

export default App;
