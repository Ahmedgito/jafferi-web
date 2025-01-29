import { HashRouter as Router, Route, Routes } from "react-router-dom";  // Change here to HashRouter
import Layout from "./components/layout/Layout";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Signin from "./components/pages/Signin";

function App() {
  return (
    <Router>  {/* Use HashRouter here */}
      <Layout>
        <Routes>
          <Route path="/jafferi-web/" element={<Home />} />
          <Route path="/jafferi-web/about" element={<About />} />
          <Route path="/jafferi-web/signin" element={<Signin />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
