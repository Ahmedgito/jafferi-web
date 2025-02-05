import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/pages/home/Home";
import Pnet from "./components/pages/professional network/Pnet" ;
import Signin from "./components/pages/signin/Signin";
import Signup from "./components/pages/signup/Signup";
import Contact from "./components/pages/contact/Contact";
import Legalass from "./components/pages/legal assistance/legalass";
import VirtualClinic from "./components/pages/virtual clinic/virtualclinic";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Default Home Route */}
          <Route path="/" element={<Home />} />

          {/* Other Pages */}
          <Route path="/professionalnetwork" element={<Pnet />} />
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
