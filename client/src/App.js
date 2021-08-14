import Routes from "./Routes";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import Layout from "./layout/Layout";

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes />
      </Layout>
    </div>
  );
}

export default App;
