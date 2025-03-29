import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import Pnet from "./pages/professionalnetwork/Pnet" ;
import Signin from "./pages/signin/Signin";
import BusinessSignup from "./pages/signup/BusinessSignup.jsx";
import Signup from "./pages/signup/Signup";
import Contact from "./pages/contact/Contact";
import Legalass from "./pages/legalassistance/Legalass";
import VirtualClinic from "./pages/virtualclinic/virtualclinic";
import Business from "./pages/bussinessnesnetwork/Business";
import BusinessGroup from "./pages/business-group/BusniessGroup";
import Admin from "./pages/admin/admin";
import PrivateRoute from './routes/PrivateRoute.jsx';
import PublicRoute from "./routes/PublicRoute.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ForgotPassword from "./pages/forgot-password/ForgotPassword.jsx";
import ResetPassword from "./pages/forgot-password/ResetPassword.jsx";


const requiredIndustries = {
  professionalNetwork: [
    "Agriculture, Environment & Sustainability",
    "Arts, Communication, Media & Design",
    "Consulting, Finance, Operations & Entrepreneurship",
    "Education, Human Services & NonProfit",
    "Hospitality, Sports & Recreation",
    "Technology, Engineering & Data"
  ],
  legalAssistance: ["Government, Policy, Law & International Affairs"],
  virtualClinic: ["Health & Sciences"]
};
function App() {

  return (
  <Provider store={store}>
    <Router>
      <Layout>
        <Routes>
          {/* Default Home Route */}
          <Route path="/" element={<Home />} />

          {/* Other Pages */}
          <Route path="/professionalnetwork" element={<PrivateRoute allowedIndustries={requiredIndustries.professionalNetwork}> <Pnet /> </PrivateRoute>} />
          <Route path="/businessnetwork" element={<PrivateRoute allowedIndustries={requiredIndustries.professionalNetwork}> <Business /> </PrivateRoute>} />
          <Route path="/legalassistance" element={<PrivateRoute allowedIndustries={requiredIndustries.legalAssistance}> <Legalass /> </PrivateRoute>} />
          <Route path="/virtualclinic" element={<PrivateRoute allowedIndustries={requiredIndustries.virtualClinic}> <VirtualClinic/> </PrivateRoute>} />
          <Route path="/business" element={<BusinessGroup/>} />

          <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
          <Route path="/business-signup" element={<PublicRoute><BusinessSignup/></PublicRoute>} />
          <Route path="/signin" element={<PublicRoute><Signin /></PublicRoute>} />
          <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
          <Route path="/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/dashboard" element={<PrivateRoute allowedRoles={['admin']}> <Admin /> </PrivateRoute>} />
          {/* Redirect unknown routes to Home */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </Layout>
    </Router>
  </Provider>
  );
}

export default App;
