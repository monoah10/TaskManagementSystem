import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/axios";

import TaskTable from "../components/TaskTable";
import TaskForm from "../components/TaskForm";
import Navbar from "../components/Navbar";
import DashboardCards from "../components/DashboardCards";
import CategoryManager from "../components/CategoryManager";
import CategoryModal from "../components/CategoryModal";
import Button from "@mui/material/Button";

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({});
    const [tasks, setTasks] = useState([]);
    const [catOpen, setCatOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const location = useLocation();
    const reloadTasks = () => {
    fetchTasks();
    fetchStats();
};

    useEffect(() => {
    if (location.state?.taskId) {
        api.get(`/tasks/${location.state.taskId}/`)
            .then(res => setSelectedTask(res.data));
    }
}, []);

    const fetchStats = async () => {

        const response = await api.get(
            "/dashboard/stats/"
        );

        setStats(response.data);
    };

    const fetchTasks = async () => {
    setLoading(true);
    const response = await api.get("/tasks/");
    setTasks(response.data);
    setLoading(false);
};

    return (
        <>
         <Navbar />
        <div style={{ padding: "20px" }}>
            <Button variant="outlined" onClick={() => setCatOpen(true)}>
            Manage Categories
            </Button>
            <h1>Task Dashboard</h1>
            <DashboardCards stats={stats} />
            <TaskTable tasks={tasks}
             setSelectedTask={setSelectedTask}
             reloadTasks={reloadTasks}
             />
            <TaskForm
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
            onTaskCreated={reloadTasks} />

            <CategoryModal
    open={catOpen}
    onClose={() => setCatOpen(false)}
    isAdmin={true}
/>
        </div>
        </>
    );
}