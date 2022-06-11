import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import 'antd/dist/antd.min.css'
import HomeLayout from "./components/ui/HomeLayout";
import Home from "./components/pages/Home";
import Favorites from "./components/pages/Favorites";
import UserPage from "./components/pages/UserPage";


function App() {
  return (  
    <Router>
      <HomeLayout>
          <Routes>
              <Route path="/" exact element={<Home/>}/>
              <Route path="/favorite" exact element={<Favorites/>}/>
              <Route path="/profile" exact element={<UserPage/>}/>
          </Routes>
      </HomeLayout>
    </Router>
  );
}

export default App;
