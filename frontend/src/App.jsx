import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios';
import CookiesProvider from "./context/CookiesProvider";
import Spinner from "./components/Spinner";
import Login from "./pages/Login";
import { Provider } from 'react-redux';
import store from "./redux/store"
import SymptomChecker from "./pages/common/SymptomChecker";
import ApplyDoctor from "./pages/user/ApplyDoctor";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import PublicRoute from "./components/PublicRoute";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Notification from "./pages/common/Notification";
import Users from "./pages/admin/Users"
import Doctors from "./pages/admin/Doctors"
import BookingPage from "./pages/doctor/BookingPage"
import Profile from "./pages/doctor/DoctorProfile";
import Appointments from "./pages/user/UserAppointments";
import DoctorAppointments from "./pages/doctor/DoctorAppointments"
import UserAppointments from "./pages/user/UserAppointments";
import VideoMeeting from "./pages/common/VideoMeeting";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import UserProfile from "./pages/user/UserProfile";

function App() {
  console.log(process.env.REACT_APP_BASE)
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute >
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute  >
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute   >
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute   >
                <UserAppointments />
              </ProtectedRoute>
            }
          />
          <Route path="/symptomChecker" element={<SymptomChecker />} />
          <Route
            path="/apply-doctor"
            element={
              <ProtectedRoute  >
                <ApplyDoctor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/doctors"
            element={
              <ProtectedRoute  >
                <Doctors />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute  >
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/book-appointment/:doctorId"
            element={
              <ProtectedRoute  >
                <BookingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor/profile"
            element={
              <ProtectedRoute  >
                <DoctorProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute  >
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notification"
            element={
              <ProtectedRoute  >
                <Notification />
              </ProtectedRoute>
            }
          />
          <Route
            path="/video-meeting/:roomId"
            element={
              <ProtectedRoute  >
                <VideoMeeting />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctor-appointments"
            element={
              <ProtectedRoute  >
                <DoctorAppointments />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
