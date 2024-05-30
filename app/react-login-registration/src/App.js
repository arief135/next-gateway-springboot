import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';

function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderComponent />
        <div className="container">
          <Routes>
            <Route path='/login' element={<LoginComponent />}></Route>
            <Route path="/" element={<RegisterComponent />}></Route>
            <Route path="/register" element={<RegisterComponent />}></Route>
          </Routes>
        </div>
        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
