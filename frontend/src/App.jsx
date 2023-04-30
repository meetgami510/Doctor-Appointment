import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios';
import CookiesProvider from "./context/CookiesProvider";
import Spinner from "./components/Spinner";
import Login from "./pages/Login";
import { Provider } from 'react-redux';
import store from "./redux/store"
import SymptomChecker from "./pages/SymptomChecker";
import ApplyDoctor from "./pages/ApplyDoctor";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import PublicRoute from "./components/PublicRoute";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Notification from "./pages/Notification";
import Users from "./pages/admin/Users"
import Doctors from "./pages/admin/Doctors"
import BookingPage from "./pages/doctor/BookingPage"

function App() {

  const axiosInstance = axios.create({ baseURL: 'http://localhost:8080/api' });

  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute axiosInstance={axiosInstance}>
                <Home axiosInstance={axiosInstance} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute axiosInstance={axiosInstance}>
                <Login axiosInstance={axiosInstance} />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute axiosInstance={axiosInstance} >
                <Register axiosInstance={axiosInstance} />
              </PublicRoute>
            }
          />
          <Route path="/symptomChecker" element={<SymptomChecker />} />
          <Route
            path="/apply-doctor"
            element={
              <ProtectedRoute axiosInstance={axiosInstance}>
                <ApplyDoctor axiosInstance={axiosInstance} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/doctors"
            element={
              <ProtectedRoute axiosInstance={axiosInstance}>
                <Doctors axiosInstance={axiosInstance} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute axiosInstance={axiosInstance}>
                <Users axiosInstance={axiosInstance} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/book-appointment/:doctorId"
            element={
              <ProtectedRoute axiosInstance={axiosInstance}>
                <BookingPage  axiosInstance={axiosInstance}/>
              </ProtectedRoute>
            }
          />
          <Route path="/notification" element={<Notification />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
