import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRoute from "@/components/PrivateRoute";
import { AuthProvider } from "@/components/AuthProvider";
import { MessageProvider } from "@/context/MessageContext";
import PublicRoute from "@/components/PublicRoute";

import HomePage from "@/pages/HomePage";
import Profile from "@/pages/AccountSetting/Profile";

import LoginPage from "@/pages/LoginPage";
import DocumentPage from "./pages/DocumentPage";
import { useGetMeQuery } from "./api/auth";
import { useDispatch } from "react-redux";
import UniversityPage from "./pages/UniversityPage/index";

const App = () => {
  const dispatch = useDispatch();
  const { data: user } = useGetMeQuery();

  useEffect(() => {
    if (user?.data) {
      dispatch({
        type: "auth/updateUserProfile",
        payload: user?.data,
      });
    }
  }, [user]);

  return (
    <AuthProvider>
      <MessageProvider>
        <Router>
          <Routes>
            {/* Login Routes */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>
            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<HomePage />} />
            </Route>

            {/* Profile Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/user/profile" element={<Profile />} />
            </Route>

            {/* Document Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/document" element={<DocumentPage />} />
            </Route>

            {/* University Page Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/university" element={<UniversityPage />} />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </Router>{" "}
      </MessageProvider>
    </AuthProvider>
  );
};

export default App;
