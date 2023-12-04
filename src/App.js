import './App.css';
import {BrowserRouter as Router,Route} from "react-router-dom";
import {Switch} from "react-router-dom";

import MapRoutes from "./components/mapRoutes/mapRoutes";


//admin components

import Sidebar from './pages/dashboad/sidebar/sidebar';
import Contactus from './pages/user/contactUs/contactus';
import Tours from './pages/user/tours/tours';
import Add_place from './pages/dashboad/add_place/add_place';
import TourCategory from './pages/dashboad/Tour Catergory/tourCategory';
import Hotels from './pages/dashboad/Hotel/hotels';
import Vehicals from './pages/dashboad/vehicals/vehicals';
import Agents from './pages/dashboad/agents/agents';
import Images from './pages/dashboad/Images/images';

import DayTour from './pages/dashboad/day tour/dayTour';
import Tour from './pages/dashboad/tours/tours';
import PlaceCategory from './pages/dashboad/place_category/placeCategory';
import PopularDestinations from './pages/dashboad/popular destinations/popularDestinations';
import Carousel1 from './components/carousel/carousel1';


//user components
import Navbar from './components/navbar/navbar';
import Home from './pages/user/home/home';
import Cart from './pages/user/cart/cart';
import Footer from './components/footer/footer';
import About from './pages/user/about/about';
import Register from './pages/user/register/register';
import Login from './pages/user/login/login';
import Popular from './pages/user/popular  destinations/popular';

import User from './pages/user/user/user'
import PlaceReview from './pages/user/placeReview/placeReview';

import HomeCarousel from './components/home carousel/HomeCarousel';
import TourPreview from './pages/user/tour preview/tourPreview';
import Daytour_preview from './pages/user/daytour preview/daytour_preview';
import TCPriview from './pages/user/tour category preview/tcPriview';
import Places from './pages/user/all places/places';

import Daytourbook1 from './pages/user/daytour book 1/daytourbook1';
import Daytourbook2 from './pages/user/daytour book 2/daytourbook2';

import Tourbook1 from './pages/user/tour book 1/tourbook1';
import Tourbook2 from './pages/user/tour book 2/tourbook2';


function App() {
  const currentPath = window.location.pathname;
  console.log(currentPath);
  
  return (
    <div className="App">

      {currentPath.startsWith('/dashboad') ? <Sidebar /> : (currentPath !== '/register' && currentPath !== '/login' ? <Navbar /> : null)}

      
     
      
      
      <div className={currentPath.startsWith('/dashboad') ? "Add-sub-div":null}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/carousel" component={HomeCarousel}/>
          <Route exact path="/cart/:id" component={Cart} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contactus" component={Contactus} />
          <Route exact path="/tours/:page" component={Tours} />
          <Route exact path="/tour/:tour" component={TourPreview} />
          <Route exact path="/tourcategory/:tour" component={TCPriview} />
          <Route exact path="/profile/:id" component={User} />
          <Route exact path="/placeReview/:id" component={PlaceReview} />
          <Route exact path="/daytour/:id" component={Daytour_preview}/>
          <Route exact path="/daytourbook1/:id" component={Daytourbook1}/>
          <Route exact path="/daytourbook2/:id" component={Daytourbook2}/>
          <Route exact path="/tourbook1/:id" component={Tourbook1}/>
          <Route exact path="/tourbook2/:id" component={Tourbook2}/>

          <Route exact path="/popular_destination" component={Popular} />
          <Route exact path="/places" component={Places}/>



          



            



          



          <Route exact path="/dashboad/addplace" component={Add_place}/>
          <Route exact path="/dashboad/tourCategory" component={TourCategory}/>
          <Route exact path="/dashboad/hotels" component={Hotels}/>
          <Route exact path="/dashboad/vehicals" component={Vehicals}/>
          <Route exact path="/dashboad/agents" component={Agents}/>
          <Route exact path="/dashboad/tour" component={Tour}/>
          <Route exact path="/dashboad/daytour" component={DayTour}/>

          <Route exact path="/dashboad/placeCategory" component={PlaceCategory}/>
          <Route exact path="/dashboad/images" component={Images}/>
          <Route exact path="/dashboad/popular_destinations" component={PopularDestinations}/>
          
          
        </Switch>
      </Router>

    {/* <Carousel1/> */}
      </div>

      
      {/* <Addplace /> */}
      {/* <MapRoutes /> */}

     
      {/* {currentPath.startsWith('/dashboad') ? null: <Footer/>} */}
      {currentPath.startsWith('/dashboad') ? null : (currentPath !== '/register' && currentPath !== '/login' ? <Footer /> : null)}
    </div>
  );
}

export default App;
