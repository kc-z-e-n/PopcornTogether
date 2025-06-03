import { BrowserRouter, Routes, Route } from 'react-router-dom';
/*page imports*/
import AuthPage from './pages/AuthPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Routes>
      <Route path ="/" element={<AuthPage />} />
      <Route path ="/register" element={<RegisterPage />} />
      <Route path ="/login" element={<LoginPage />} />
    </Routes>
  );
}
export default App;