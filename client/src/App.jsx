import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MintCertificate from "./components/MintCertificate";
import ViewCertificate from "./components/ViewCertificate";
import CheckOwnership from "./components/CheckOwnership";

const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <nav className="mb-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-blue-500 hover:text-blue-700">
                Mint Certificate
              </Link>
            </li>
            <li>
              <Link
                to="/view-certificate"
                className="text-blue-500 hover:text-blue-700"
              >
                View Certificate
              </Link>
            </li>
            <li>
              <Link
                to="/check-ownership"
                className="text-blue-500 hover:text-blue-700"
              >
                Check Ownership
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<MintCertificate />} />
          <Route path="/view-certificate" element={<ViewCertificate />} />
          <Route path="/check-ownership" element={<CheckOwnership />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
