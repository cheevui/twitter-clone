import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import AuthPage from './pages/AuthPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import { Provider } from 'react-redux';
import store from './store';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="*" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
