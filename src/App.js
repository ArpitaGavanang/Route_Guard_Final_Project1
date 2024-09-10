import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./index.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// All pages
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import DemoProduct from "./pages/DemoProduct";
import AdminRegistration from "./pages/AdminRegistration";
import { useDocTitle } from "./components/CustomHook";
import ScrollToTop from "./components/ScrollToTop";
import CustomerRegistration from "./components/CustomerRegistration";
import DriverRegistration from "./components/DriverRegistration";
import AdminLogin from "./components/AdminLogin";
import DriverDetails from "./pages/DriverDetails";
import CustomerDetails from "./pages/CustomerDetails";
import SuperAdminLogin from "./components/SuperAdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import VehiclesDashBoard from "./pages/VehiclesDashBoard";
import Intro from "./components/Intro";
import Services from "./components/Services";
import PrivateRoute from "./routes/PrivateRoute";
import TripDetails from "./pages/TripDetails";

function App() {
  useEffect(() => {
    const aos_init = () => {
      AOS.init({
        once: true,
        duration: 1000,
        easing: "ease-out-cubic",
      });
    };

    window.addEventListener("load", () => {
      aos_init();
    });
  }, []);
  useDocTitle("RouteGuard");
  //useDocTitle("MLD | Molad e Konsult - Bespoke Web and Mobile Applications");

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/get-demo" element={<DemoProduct />} />
          <Route path="/about" element={<Intro />} />
          <Route path="/service" element={<Services />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/superAdmin/login" element={<SuperAdminLogin />} />

          <Route element={<PrivateRoute />}>
            <Route path="/admin/registration" element={<AdminRegistration />} />
            <Route path="/driver-details" element={<DriverDetails />} />
            <Route path="/CustomerDetails" element={<CustomerDetails />} />
            <Route path="/trips" element={<TripDetails />} />
            <Route
              path="/customer/register"
              element={<CustomerRegistration />}
            />
            <Route path="/driver/register" element={<DriverRegistration />} />
            <Route path="/admin-dashBoard" element={<AdminDashboard />} />
            <Route path="/vehicles-dashBoard" element={<VehiclesDashBoard />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;





// import React, { useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import "./index.css";
// //import AdminDashboard from './pages/AdminDashboard';

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // All pages
// import Home from "./pages/Home";
// import Contact from "./pages/Contact";
// import DemoProduct from "./pages/DemoProduct";
// import AdminRegistration from "./pages/AdminRegistration";
// import { useDocTitle } from "./components/CustomHook";
// import ScrollToTop from "./components/ScrollToTop";
// import CustomerRegistration from "./components/CustomerRegistration";
// import DriverRegistration from "./components/DriverRegistration";
// import AdminLogin from "./components/AdminLogin";
// import DriverDetails from "./pages/DriverDetails";
// import CustomerDetails from "./pages/CustomerDetails";
// import SuperAdminLogin from "./components/SuperAdminLogin";
// import AdminDashboard from "./pages/AdminDashboard";
// import VehiclesDashBoard from "./pages/VehiclesDashBoard";
// import Intro from "./components/Intro";
// import Services from "./components/Services";
// import PrivateRoute from "./routes/PrivateRoute";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import TripDetails from "./pages/TripDetails";
// function App() {
//   useEffect(() => {
//     const aos_init = () => {
//       AOS.init({
//         once: true,
//         duration: 1000,
//         easing: "ease-out-cubic",
//       });
//     };

//     window.addEventListener("load", () => {
//       aos_init();
//     });
//   }, []);

//   useDocTitle("MLD | Molad e Konsult - Bespoke Web and Mobile Applications");
//   const role = localStorage.getItem("role");
//   const corsOptions = {
//     origin: '*', // Allow all origins
//     methods: '*', // Allow all HTTP methods
//     allowedHeaders: '*', // Allow all headers
//     credentials: true, // If you want to allow cookies or authentication headers
//   };
  
//   // Use CORS middleware with the specified options
//   app.use(cors(corsOptions));
//   return (
//     <>
//       <Router>
//         <Routes>
         
//             <Route path="/" element={<Home />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/get-demo" element={<DemoProduct />} />
//             <Route path="/about" element={<Intro />} />
//             <Route path="/service" element={<Services />} />
//             <Route path="/admin/login" element={<AdminLogin />} />
//             <Route path="/AdminLogin" element={<AdminLogin />} />
//             <Route path="/superAdmin/login" element={<SuperAdminLogin />} />
  
//           <Route element={<PrivateRoute />}>
//             <Route path="/admin/registration" element={<AdminRegistration />} />

//             <Route path="/driver-details" element={<DriverDetails />} />
//             <Route path="/CustomerDetails" element={<CustomerDetails />} />
//             <Route path="/trips" element={<TripDetails />} />
//             <Route
//               path="/customer/register"
//               element={<CustomerRegistration />}
//             />

//             <Route
//               path="/driver/register"
//               element={<DriverRegistration />}
//             />
           
//             <Route path="/admin-dashBoard" element={<AdminDashboard />} />
//             <Route path="/vehicles-dashBoard" element={<VehiclesDashBoard />} />
//           </Route>

//           {/* Add other routes here */}
//         </Routes>
//       </Router>
//     </>
//   );
// }

// export default App;

