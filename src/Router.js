import React, {Suspense, useEffect, useState} from 'react';
import { BrowserRouter, Route,Routes, Navigate, useLocation, NavLink, Link} from 'react-router-dom';

import Home from './Components/Pages/Home';
import Contact from './Components/Pages/Contact';
import Properties from './Components/Pages/Properties';
import Houses from './Components/Pages/Houses';
import Apartments from './Components/Pages/Apartments';
import Plots from './Components/Pages/Plots';
import Files from './Components/Pages/Files';
import Rentals from './Components/Pages/Rentals';
import SearchProperty from './Components/Pages/SearchProperty';
import SingleProperty from './Components/Pages/SingleProperty';
import Header from './Components/Shared/Header';
import FooterSoft from './Components/Shared/FooterSoft';
import Register from './Components/Auth/Register';
import RentalPropertyManagement from './Components/Pages/RentalPropertyManagement';
import PropertyDemand from './Components/Pages/PropertyDemand';
import Pricing from './Components/Pages/Pricing';
import Maping from './Components/Pages/Maping';
import AboutUs from './Components/Pages/AboutUs';
import Jobs from './Components/Pages/Jobs';
import Login from './Components/Auth/Login';
import AddProperty from './Components/Pages/AddProperty';
import PropertyListing from './Components/Pages/PropertyListing';
import NotificationListing from './Components/Pages/NotificationListing';
import BlogDetail from './Components/Pages/BlogDetail';
import BlogDetail2 from './Components/Pages/BlogDetail2';
import BlogDetail3 from './Components/Pages/BlogDetail3';
import BlogDetail4 from './Components/Pages/BlogDetail4';

import TermsCondition from './Components/Pages/TermsCondition';
import PrivacyPolicy from './Components/Pages/PrivacyPolicy';
import Disclaimer from './Components/Pages/Disclaimer';

import NoRouteFound from './Components/Shared/NoRouteFound';
import MyAccount from './Components/Auth/MyAccount';
import Dashboard from './Components/Auth/my-account/Dashboard';
import UserProfile from './Components/Auth/my-account/UserProfile';
import ChangePassword from './Components/Auth/my-account/ChangePassword';
import AddedProperties from './Components/Auth/my-account/PropertyListing';
import EditProperty from './Components/Auth/my-account/EditProperty';

import Requests from './Components/Auth/my-account/Requests';
import ForgotPassword from './Components/Auth/ForgotPassword';
import PasswordReset from './Components/Auth/PasswordReset';
import CustomerServices from './Components/Pages/CustomerServices';
import {AuthState} from './Context/Context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Router() {
   const {state : {authUser, notifications, user_info}, dispatch} = AuthState();
   function RequireAuth({ children }) {
      let location = useLocation();
      if (!authUser) {
         return <Navigate to="/login" state={{ from: location }} />;
      }
      
      return children;
   }
   
   return (
         <div className="page">
            <ToastContainer />
               <BrowserRouter>
                  <Suspense fallback={<div>Loading...</div>}>
                     <Header/>
                     <div className="body-content">
                        <Routes onUpdate={() => window.scrollTo(0, 0)}>
                           <Route path="/" element={<Home />} />
                           <Route path="/contact" element={<Contact />} />
                           <Route path="/properties" element={<Properties />} />
                           <Route path="/top-deals-on-houses" element={<Houses />} />
                           <Route path="/top-deals-on-apartments" element={<Apartments />} />
                           <Route path="/top-deals-on-plots" element={<Plots />} />
                           <Route path="/top-rental-property-deals" element={<Rentals />} />
                           <Route path="/top-deals-on-files" element={<Files />} />
                           <Route path="/login" element={<Login />} />
                           <Route path="/register" element={<Register />} />
                           <Route path="/forgot-password" element={<ForgotPassword />} />
                           <Route path="/password/reset/:token" element={<PasswordReset />} />
                           <Route path="/rental-property-management" element={<RentalPropertyManagement />}/>
                           <Route path="/add-property" element={<AddProperty />}/>
                           <Route path="/property-on-demand" element={<PropertyDemand/>}/>
                           <Route path="/pricing" element={<Pricing/>}/>
                           <Route path="/maping" element={<Maping/>}/>
                           <Route path="/about-us" element={<AboutUs/>}/>
                           <Route path="/blog-construction-and-building-control-process-in-dha" element={<BlogDetail/>}/>
                           <Route path="/dha-lahore-transfer-process" element={<BlogDetail2/>}/>
                           <Route path="/foreign-transfer-process-in-dha-if-seller-or-buyer-is-out-of-pakistan" element={<BlogDetail3/>}/>
                           <Route path="/issuance-of-allocation-intimation-allotment-transfer-letter" element={<BlogDetail4/>}/>
                           <Route path="/terms-and-conditions" element={<TermsCondition/>}/>
                           <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
                           <Route path="/disclaimer" element={<Disclaimer/>}/>
                           <Route path="/jobs" element={<Jobs/>}/>
                           <Route path="/customer-services" element={<CustomerServices />} />
                           <Route path="/search-property" element={<SearchProperty />} />
                           <Route path="/notifications" element={<NotificationListing />} />

                           <Route exact path="/my-account"
                              element={
                                 <RequireAuth>
                                    <MyAccount/>
                                 </RequireAuth>
                              }
                           >
                              <Route path="dashboard" element={<Dashboard />} />

                              <Route  exact path="user-profile" element={<UserProfile />} />
                              <Route  exact path="change-password" element={<ChangePassword />} />
                              <Route  exact path="added-properties" element={<AddedProperties />} />
                              <Route  exact path="edit-property/:uuid" element={<EditProperty />} />
                              {/* <Route  exact path="requests" element={<Requests />} /> */}
                              <Route  exact path="*" element={<NoRouteFound />} />
                           </Route>

                           <Route path="/property/:id" element={<SingleProperty />} />
                           <Route path="/:parent_property_type/:city" element={<PropertyListing />} />
                           <Route path="/:parent_property_type/:city/:parent_location" element={<PropertyListing />} />
                           <Route path="/:parent_property_type/:city/:parent_location/:child_location" element={<PropertyListing />} />
                           <Route path="/:parent_property_type/:city/:parent_location/:child_location/:grand_location" element={<PropertyListing />} />
                           
                           <Route path="*" element={<NoRouteFound/>} />
                        </Routes>
                     </div>
                     <FooterSoft />
                  </Suspense>
               </BrowserRouter>
            </div>
   );
}

export default Router;
