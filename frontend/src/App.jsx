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

function App() {
  const { loading } = useSelector(state => state.alerts);

  const axiosInstance = axios.create({ baseURL: 'http://localhost:8080/api' });

  return (
    <CookiesProvider>
      <BrowserRouter>
        {loading && <Spinner />}
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
          <Route path="/apply-doctor" element={<ApplyDoctor />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
