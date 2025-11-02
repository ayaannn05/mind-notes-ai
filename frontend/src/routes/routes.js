import Home from "../landingPage/page/Home";
import { routesConstant } from "./routesConstant";
import ProjectItems from "../pages/ProjectPage/ProjectItems";
import SessionPage from "../pages/sessionPage/SessionPage";
import ProjectPage from "../pages/ProjectPage/ProjectPage";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import VerifyEmail from "../pages/auth/verifyEmail";
import Dashboard from "../pages/Dashboard/Dashboard";  
import NotePage from "../pages/Dashboard/NotePage";
const routes = [
  {
    path: routesConstant.Home,
    component: Home,
    private:false, 
    restricted:false,
  },
  {
    path: routesConstant.Login,
    component: Login,
    private: false,
    restricted:true,
  },
  {
    path: routesConstant.Signup,
    component: Signup,
    private: false,
    restricted:true,
  },
  {
    path: routesConstant.VerifyEmail,
    component: VerifyEmail,
    private: false,
    restricted:false,
  },
  {
    path: routesConstant.Dashboard,
    component: Dashboard,
    private: true,
  },
  {
    path: routesConstant.NotePage,
    component: NotePage,
    private: true,
  },
  {
    path: routesConstant.Project,
    component: ProjectPage,
    private: true,
  },
  {
    path: routesConstant.ProjectItemPage,
    component: ProjectItems,
    private: true,
  },
  {
    path: routesConstant.SessionPage,
    component: SessionPage,
    private: true,
  },
];

export default routes;
