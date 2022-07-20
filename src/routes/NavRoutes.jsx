import ManageAsset from "../components/admin/assets/ManageAsset";
import ManageAssignment from "../components/admin/assignments/ManageAssignment";
import HomeAdmin from "../components/admin/HomeAdmin";
import CreateUser from "../components/admin/users/CreateUser";
import RequestForReturning from "../components/admin/request/RequestForReturning";
import Report from "../components/admin/report/report";


export const NavRoutes = [
    {
        path: "/",
        element: <HomeAdmin />,
        title: "Home",
      },
      {
        path: "/createuser",
        element: <CreateUser />,
        title: "Manage User",
      },
      {
        path: "/asset",
        element: <ManageAsset />,
        title: "Manage Asset",
      },
      {
        path: "/assignment",
        element: <ManageAssignment />,
        title: "Manage Assignment",
      },
      {
        path: "/request",
        element: <RequestForReturning/>,
        title: "Request for Returning",
      },
    
      {
        path: "/report",
        element:<Report/>,
        title: "Report",
      },
    
];