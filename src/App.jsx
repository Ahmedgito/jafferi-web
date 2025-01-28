import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout" ;
import Home from "./components/pages/Home";
import About from "./components/pages/About";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/jafferi-web/" element={<Home />} />
          <Route path="/jafferi-web/about" element={<About />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
