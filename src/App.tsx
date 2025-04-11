import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRoute from "@/components/PrivateRoute";
import { AuthProvider } from "@/components/AuthProvider";
import { MessageProvider } from "@/context/MessageContext";
import PublicRoute from "@/components/PublicRoute";

import HomePage from "@/pages/HomePage";
import UserPage from "@/pages/AccountSetting/User";
import Profile from "@/pages/AccountSetting/Profile";

import LoginPage from "@/pages/LoginPage";
import UniversityPage from "./pages/UniversityPage";
import SubjectPage from "./pages/SubjectPage";
import DocumentPage from "./pages/DocumentPage";
import DocumentDetail from "./pages/DocumentPage/DocumentDetail";
import { useGetMeQuery } from "./api/auth";
import { useDispatch } from "react-redux";
import Transaction from "./pages/Transaction";
import TransactionDetail from "./pages/Transaction/TransactionDetail";

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

            {/* User Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/account-setting/user" element={<UserPage />} />
            </Route>

            {/* University Routes */}
            <Route element={<PrivateRoute />}>
              <Route
                path="/category-setting/university"
                element={<UniversityPage />}
              />
            </Route>

            {/* Subject Routes */}
            <Route element={<PrivateRoute />}>
              <Route
                path="/category-setting/subject"
                element={<SubjectPage />}
              />
            </Route>

            {/* Document Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/document" element={<DocumentPage />} />
            </Route>

            {/* Document Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/document/:id" element={<DocumentDetail />} />
            </Route>

            {/* Transaction Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/transaction" element={<Transaction />} />
            </Route>

            {/* Transaction Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/transaction/:id" element={<TransactionDetail />} />
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
