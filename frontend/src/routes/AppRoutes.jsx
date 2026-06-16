import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Login from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import TaskDetail from "../pages/TaskDetail";
import Register from "../pages/Register";

export default function AppRoutes() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/tasks/:id"
                    element={
                        <ProtectedRoute>
                            <TaskDetail />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/register"
                    element={<Register />}
                />
            </Routes>

        </BrowserRouter>
    );
}