import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useSelector } from "react-redux";
import axios from 'axios';
import CookiesProvider from "./context/CookiesProvider";
import Spinner from "./components/Spinner";
import Login from "./pages/Login";
import { Provider } from 'react-redux';
import store from "./redux/store"
import SymptomChecker from "./pages/SymptomChecker";
import ApplyDoctor from "./pages/ApplyDoctor";

function App() {
  const { loading } = useSelector(state => state.alerts);
  const [cookies, setCookies, removeCookies] = useCookies(['token']);

  const instance = axios.create({ baseURL: 'http://localhost:8080/api' });

  return (
    <CookiesProvider>
      <BrowserRouter>
        {loading && <Spinner />}
        <Routes>
          <Route path="/login" element={<Login instance={instance} />} />
          <Route path="/symptomChecker" element={<SymptomChecker />} />
          <Route path="/apply-doctor" element={<ApplyDoctor />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
