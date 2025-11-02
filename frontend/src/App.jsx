import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import routes from "./routes/routes";
import PrivateRoute from "./routes/privateRoute";
import PublicRoute from "./routes/publicRoute";
import { AuthProvider } from "./context/authContext";
import Navbar7 from "./landingPage/components/Navbar";
import Footer from "./landingPage/components/Footer";

function App() {
    return (
      <>
        <AuthProvider>
          <Navbar7 />
          <Routes>
            {routes.map((route) =>
              route.private ? (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <PrivateRoute>
                      <route.component />
                    </PrivateRoute>
                  }
                />
              ) : (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <PublicRoute restricted={route.restricted}>
                      <route.component />
                    </PublicRoute>
                  }
                />
              )
            )}
          </Routes>
          {/* <Footer /> */}
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              // Global options
              style: {
                borderRadius: "8px",
                padding: "16px",
                fontSize: "16px",
              },
              success: {
                style: {
                  background: "#FA8B23", // Brand color
                  color: "white",
                },
                iconTheme: {
                  primary: "white",
                  secondary: "#FA8B23",
                },
              },
              error: {
                style: {
                  background: "#FF4C4C",
                  color: "white",
                },
                iconTheme: {
                  primary: "white",
                  secondary: "#FF4C4C",
                },
              },
            }}
          />
        </AuthProvider>
      </>
    );
}

export default App;