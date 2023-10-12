import './App.css';
import {BrowserRouter as Router,Route} from "react-router-dom";
import {Switch} from "react-router-dom";
import Addplace from "./pages/addplace/addplace";
import MapRoutes from "./components/mapRoutes/mapRoutes";
import Add_place from "./pages/addplace/Dashboard/add_place/add_place";
import Sidebar from './pages/addplace/Dashboard/sidebar/sidebar';

function App() {
  return (
    <div className="App">
      <Sidebar/>
      <div className="Add-sub-div">
      <Router>
        <Switch>
          <Route exact path="/" component={Add_place}/>
        </Switch>
      </Router>

      </div>

      
      {/* <Addplace /> */}
      {/* <MapRoutes /> */}
    </div>
  );
}

export default App;
