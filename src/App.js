import './App.css';
import {BrowserRouter as Router,Route} from "react-router-dom";
import {Switch} from "react-router-dom";
import Addplace from "./pages/addplace/addplace";
import MapRoutes from "./components/mapRoutes/mapRoutes";
import Add_place from './pages/dashboad/add_place/add_place';
import Sidebar from './pages/dashboad/sidebar/sidebar';



import Navbar from './components/navbar/navbar';

function App() {
  const currentPath = window.location.pathname;
  console.log(currentPath);
  
  return (
    <div className="App">
      {currentPath.startsWith('/dashboad') ? <Sidebar/>:<Navbar/>}
      
      
      <div className="Add-sub-div">
      <Router>
        <Switch>
          <Route exact path="/dashboad/addplace" component={Add_place}/>
        </Switch>
      </Router>

      </div>

      
      {/* <Addplace /> */}
      {/* <MapRoutes /> */}
    </div>
  );
}

export default App;
