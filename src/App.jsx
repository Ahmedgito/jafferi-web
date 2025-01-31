import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/pages/home/Home";
import About from "./components/pages/about/About";
import Signin from "./components/pages/signin/Signin";
import Signup from "./components/pages/signup/Signup";
import Contact from "./components/pages/contact/Contact";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Default Home Route */}
          <Route path="/" element={<Home />} />

          {/* Other Pages */}
          <Route path="/about" element={<About />} />
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
