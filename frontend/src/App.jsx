import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext.jsx";
import Layout from "./components/common/Layout.jsx";
import PrivateRoute from "./components/common/PrivateRoute.jsx";

import Login from "./components/auth/Login.jsx";
import Register from "./components/auth/Register.jsx";
import TaskList from "./components/tasks/TaskList.jsx";
import TaskForm from "./components/tasks/TaskForm.jsx";

import "./styles/App.css";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Layout>
                    <Navigate to="/tasks" replace />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/tasks"
              element={
                <PrivateRoute>
                  <Layout>
                    <TaskList />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/tasks/new"
              element={
                <PrivateRoute>
                  <Layout>
                    <TaskForm />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/tasks/:id/edit"
              element={
                <PrivateRoute>
                  <Layout>
                    <TaskForm />
                  </Layout>
                </PrivateRoute>
              }
            />

            {/* 404 catch-all */}
            <Route path="*" element={<Navigate to="/tasks" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
