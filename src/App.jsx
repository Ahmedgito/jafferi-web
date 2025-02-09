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

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Default Home Route */}
          <Route path="/" element={<Home />} />

          {/* Other Pages */}
          <Route path="/professionalnetwork" element={<Pnet />} />
          <Route path="/businessnetwork" element={<Business />} />
          <Route path="/legalassistance" element={<Legalass />} />
          <Route path="/virtualclinic" element={<VirtualClinic/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/contact" element={<Contact />} />

          {/* Redirect unknown routes to Home */}
          <Route path="*" element={<Navigate to="/" />} />
        
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
