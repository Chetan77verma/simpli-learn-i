import Routes from "./Routes";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import Layout from "./layout/Layout";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Routes />
        </Layout>
      </Router>
    </div>
  );
}

export default App;
