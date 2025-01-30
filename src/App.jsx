import { HashRouter as Router, Route, Routes } from "react-router-dom";  // Change here to HashRouter
import Layout from "./components/layout/Layout";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Signin from "./components/pages/Signin";
import Signup from "./components/pages/Signup" ;
import Contact from "./components/pages/Contact";

function App() {
  return (
    <Router>  {/* Use HashRouter here */}
      <Layout>
        <Routes>
          <Route path="/jafferi-web/" element={<Home />} />
          <Route path="/jafferi-web/about" element={<About />} />
          <Route path="/jafferi-web/signup" element={<Signup />} />
          <Route path="/jafferi-web/signin" element={<Signin />} />
          <Route path="/jafferi-web/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
