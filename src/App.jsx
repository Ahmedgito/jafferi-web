import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import Pnet from "./pages/professionalnetwork/Pnet" ;
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";
import Contact from "./pages/contact/Contact";
import Legalass from "./pages/legalassistance/Legalass";
import VirtualClinic from "./pages/virtualclinic/virtualclinic";
import Business from "./pages/bussinessnesnetwork/Business";
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from "./routes/PublicRoute";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
  <Provider store={store}>
    <Router>
      <Layout>
        <Routes>
          {/* Default Home Route */}
          <Route path="/" element={<Home />} />

          {/* Other Pages */}
          <Route path="/professionalnetwork" element={<PrivateRoute><Pnet /></PrivateRoute>} />
          <Route path="/businessnetwork" element={<Business />} />
          <Route path="/legalassistance" element={<Legalass />} />
          <Route path="/virtualclinic" element={<VirtualClinic/>} />
          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/contact" element={<Contact />} />

          {/* Redirect unknown routes to Home */}
          <Route path="*" element={<Navigate to="/" />} />
        
        </Routes>
      </Layout>
    </Router>
  </Provider>
  );
}

export default App;
