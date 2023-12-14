import './App.css';
import { BrowserRouter as Router, Route,Routes, BrowserRouter } from "react-router-dom";






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
import Request from './pages/dashboad/request/request';
import Carousel1 from './components/carousel/carousel1';

import Login_  from './pages/dashboad/log in/login';


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


import PrivateRoute from './utils/PrivateRoute';
import AdminRoutes from './utils/AdminRoutes';

// import ProtectedRoute from './protectRouter';
function App() {
  const currentPath = window.location.pathname;
;

  const user = 'user'
  
  return (
    <div className="App">

      
{currentPath.startsWith('/admin') ? null : (
        currentPath.startsWith('/dashboad') ? <Sidebar /> : 
        (currentPath !== '/register' && currentPath !== '/login' ? <Navbar /> : null)
      )}

      

      
     
      
      
      {/* <div className={currentPath.startsWith('/dashboad') ? "Add-sub-div":null}> */}
        
      <Router>

          <Routes>
              <Route element={<Login/>} path="/login"/>
              <Route exact path="/register" element={<Register/>}/>
                  <Route exact path="/about" element={<About/>} />
                  <Route exact path="/contactus" element={<Contactus/>} />
                  <Route exact path="/tours/:page" element={<Tours/>} />
                  <Route exact path="/tour/:tour" element={<TourPreview/>} />
                  <Route exact path="/tourcategory/:tour" element={<TCPriview/>} />
                  <Route exact path="/placeReview/:id" element={<PlaceReview/>} />
                  <Route exact path="/daytour/:id" element={<Daytour_preview/>}/>
                  <Route exact path="/popular_destination" element={<Popular/>} />
                  <Route exact path="/places" element={<Places/>}/>




              {/* user private */}
              <Route element={<PrivateRoute/>}>
                  <Route element={<Home/>} path="/" exact/>
                  
                  <Route exact path="/daytourbook1/:id" element={<Daytourbook1/>}/>
                  <Route exact path="/daytourbook2/:id/:pcount/:date" element={<Daytourbook2/>}/>
                  <Route exact path="/tourbook1/:id" element={<Tourbook1/>}/>
                  <Route exact path="/tourbook2/:id/:hotel/:pcount/:date" element={<Tourbook2/>}/>

                  <Route exact path="/carousel" element={<HomeCarousel/>}/>
                    <Route exact path="/cart/:id" element={<Cart/>} /> 
                    <Route exact path="/profile/:id" element={<User/>} />
          
              </Route>



            {/* admin private */}
              <Route element={<AdminRoutes/>}>
                <Route exact path="/dashboad/addplace" element={<Add_place/>}/>
          <Route exact path="/dashboad/tourCategory" element={<TourCategory/>}/>
          <Route exact path="/dashboad/hotels" element={<Hotels/>}/>
          <Route exact path="/dashboad/vehicals" element={<Vehicals/>}/>
          <Route exact path="/dashboad/agents" element={<Agents/>}/>
          <Route exact path="/dashboad/tour" element={<Tour/>}/>
          <Route exact path="/dashboad/daytour" element={<DayTour/>}/>
          <Route exact path="/dashboad/placeCategory" element={<PlaceCategory/>}/>
          <Route exact path="/dashboad/images" element={<Images/>}/>
          <Route exact path="/dashboad/popular_destinations" element={<PopularDestinations/>}/>
          <Route exact path="/admin/login" element={<Login_/>}/>
          <Route exact path="/dashboad/request" element={<Request/>}/>
              </Route>

          </Routes>
      </Router>
              
              
              
             

             


          
{/*           
          
          
          
          
          
          
         










          
          
           */}
        
     


    {/* <Carousel1/> */}
      {/* </div> */}

      
    

      {currentPath.startsWith('/admin') ? null : (
        currentPath.startsWith('/dashboad') ? null : 
        (currentPath !== '/register' && currentPath !== '/login' ? <Footer /> : null)
      )}
  </div>
  );
}

export default App;








