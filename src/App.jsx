
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Stores from './pages/Stores';
import SKUs from './pages/SKUs';
import Planning from './pages/Planning';
import Chart from './pages/Chart';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Stores />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/skus" element={<SKUs />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/chart" element={<Chart />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
