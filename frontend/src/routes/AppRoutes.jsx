import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import { Landing, Login, RoleSelection, Signup } from "../pages";

import VendorLayout from "../layouts/VendorLayout";
import {
  VendorDashboard,
  Services,
  Bookings,
  Calendar,
  Earnings,
  Profile,
} from "../pages/Vendor";

import ProtectedRoute from "../components/ProtectedRoute";




const router = createBrowserRouter(
  createRoutesFromElements(
     <>
    <Route path="/" element={<PublicLayout />}>
      <Route index element={<Landing />} />

      {/* Auth Pages */}
      <Route path="auth-page" element={<RoleSelection />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Route>

         {/* 🧑‍💼 VENDOR ROUTES (SEPARATE LAYOUT) */}
      <Route
        path="/vendor"
        element={
          <ProtectedRoute role="vendor">
            <VendorLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<VendorDashboard />} />
        <Route path="services" element={<Services />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="earnings" element={<Earnings />}/>
        <Route path="profile" element={<Profile />} />

      </Route>
      </>
  )
);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
