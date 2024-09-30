import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Discover from "./pages/Discover";
import Collection from "./pages/Collection";
import Sell from "./pages/Sell";
import Recreate from "./pages/Recreate";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Layout from "./components/Layout";
import Upload from "./pages/Upload";

function _Router() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/collection" element={<Collection />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/recreate" element={<Recreate />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default _Router;
