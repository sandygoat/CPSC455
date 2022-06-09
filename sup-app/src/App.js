import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Layout from "./components/ui/Layout";
import Main from "./components/pages/Main";
import Favorites from "./components/pages/Favorites";
import UserPage from "./components/pages/UserPage";

function App() {
  return (
    <Router>
      <Layout>
          <Routes>
              <Route path="/" exact element={<Main/>}/>
              <Route path="/favorites" exact element={<Favorites/>}/>
              <Route path="/profile" exact element={<UserPage/>}/>
          </Routes>
      </Layout>
    </Router>
  );
}

export default App;
