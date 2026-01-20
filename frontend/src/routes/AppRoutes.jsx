import  {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider 
} from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import { Landing } from "../pages";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<PublicLayout />}>
                <Route index element={<Landing />} />
            </Route>
            {/* <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} /> */}
        </>
    )
)

function AppRouter(){
    return <RouterProvider router = {router}/>;
}

export default AppRouter


