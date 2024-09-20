import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Preloader from "./components/molecules/Preloader";
import { checkAuth, getWallets } from "./features/admin";
import { useDispatch } from "./hooks";
import DashboardLayout from "./components/templates/layout/DashboardLayout";

const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const LevelOne = lazy(() => import("./pages/LevelOne"));
const LevelTwo = lazy(() => import("./pages/LevelTwo"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Statistics = lazy(() => import("./pages/Statistics"));
const Settings = lazy(() => import("./pages/Settings"));

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const initY = async () => {
    // setTimeout(() => {
    dispatch(checkAuth());
    dispatch(getWallets());
    // }, 1200);
  };

  useEffect(() => {
    location.pathname.includes("/dashboard") && initY();
  }, [location.pathname]);

  return (
    <>
      <Routes>
        {/* Index Page */}
        <Route
          index
          path="/"
          element={
            <Suspense fallback={<Preloader />}>
              <Home />
            </Suspense>
          }
        />
        {/* <Route
                path="previewer"
                element={
                  <Suspense fallback={<Preloader />}>
                    <PdfViewerPage />
                  </Suspense>
                }
              /> */}
        {/* Dashboard Section */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* Index Page */}
          <Route
            index
            element={
              <Suspense fallback={<Preloader />}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/level/1"
            element={
              <Suspense fallback={<Preloader />}>
                <LevelOne />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/level/2"
            element={
              <Suspense fallback={<Preloader />}>
                <LevelTwo />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/notifications"
            element={
              <Suspense fallback={<Preloader />}>
                <Notifications />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/statistics"
            element={
              <Suspense fallback={<Preloader />}>
                <Statistics />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/settings"
            element={
              <Suspense fallback={<Preloader />}>
                <Settings />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;
