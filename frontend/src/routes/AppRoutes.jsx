import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import { Landing, Login, RoleSelection, Signup } from "../pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<PublicLayout />}>
      <Route index element={<Landing />} />

      {/* Auth Pages */}
      <Route path="auth-page" element={<RoleSelection />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Route>
  )
);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;
