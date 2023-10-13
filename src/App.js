import './App.css';
import {BrowserRouter as Router,Route} from "react-router-dom";
import {Switch} from "react-router-dom";
import Addplace from "./pages/addplace/addplace";
import MapRoutes from "./components/mapRoutes/mapRoutes";


//admin components
import Add_place from './pages/dashboad/add_place/add_place';
import Sidebar from './pages/dashboad/sidebar/sidebar';

import Carousel1 from './components/carousel/carousel1';


//user components
import Navbar from './components/navbar/navbar';
import Home from './pages/user/home/home';



function App() {
  const currentPath = window.location.pathname;
  console.log(currentPath);
  
  return (
    <div className="App">
      {currentPath.startsWith('/dashboad') ? <Sidebar/>:<Navbar/>}
      
      
      <div className={currentPath.startsWith('/dashboad') ? "Add-sub-div":null}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>



          {/* admin routes */}
          <Route exact path="/dashboad/addplace" component={Add_place}/>
        </Switch>
      </Router>

    {/* <Carousel1/> */}
      </div>

      
      {/* <Addplace /> */}
      {/* <MapRoutes /> */}
    </div>
  );
}

export default App;
