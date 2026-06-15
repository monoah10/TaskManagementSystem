import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

import {
    Container,
    Card,
    CardContent,
    Typography,
    Divider,
    Grid,
    Chip,
    Box,
} from "@mui/material";

import api from "../api/axios";
import CommentSection from "../components/CommentSection";
import Navbar from "../components/Navbar";

export default function TaskDetail() {

    const { id } = useParams();
    const [task, setTask] = useState(null);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchTask();
    }, []);

    const fetchTask = async () => {
        try {
            const response = await api.get(`/tasks/${id}/`);
            setTask(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const canEdit =
    task &&
    user &&
    (
        Number(task.assigned_to) === Number(user.user_id || user.id) ||
        user.is_staff ||
        user.is_superuser
    );

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Delete this task?");
        if (!confirmDelete) return;

        try {
            await api.delete(`/tasks/${id}/`);
            toast.success("Task deleted");
            navigate("/");
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete task");
        }
    };

    const handleEdit = () => {
    navigate("/", { state: { taskId: task.id } });};
    if (!task) {
        return <h3 style={{ padding: "20px" }}>Loading...</h3>;
    }

    return (
        <>
            <Navbar />

            <Container maxWidth="md" sx={{ mt: 4 }}>

                <Card sx={{ p: 2, boxShadow: 3, borderRadius: 3 }}>

                    <CardContent>

                        {/* Title */}
                        <Typography variant="h4" gutterBottom>
                            {task.title}
                        </Typography>

                        <Divider sx={{ mb: 2 }} />

                        {/* Description */}
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            {task.description}
                        </Typography>

                        <Grid container spacing={2}>

                            {/* Status */}
                            <Grid item xs={6}>
                                <Typography variant="subtitle2">Status</Typography>
                                <Chip label={task.status} color="primary" />
                            </Grid>

                            {/* Priority */}
                            <Grid item xs={6}>
                                <Typography variant="subtitle2">Priority</Typography>
                                <Chip label={task.priority} color="warning" />
                            </Grid>

                            {/* Category */}
                            <Grid item xs={6}>
                                <Typography variant="subtitle2">Category</Typography>
                                <Typography>{task.category_name}</Typography>
                            </Grid>

                            {/* Assigned */}
                            <Grid item xs={6}>
                                <Typography variant="subtitle2">Assigned To</Typography>
                                <Typography>{task.assigned_to_name}</Typography>
                            </Grid>

                            {/* Due Date */}
                            <Grid item xs={6}>
                                <Typography variant="subtitle2">Due Date</Typography>
                                <Typography>{task.due_date}</Typography>
                            </Grid>

                            {/* Created By */}
                            <Grid item xs={6}>
                                <Typography variant="subtitle2">Created By</Typography>
                                <Typography>{task.created_by_name}</Typography>
                            </Grid>

                            {/* Created At */}
                            <Grid item xs={6}>
                                <Typography variant="subtitle2">Created At</Typography>
                                <Typography>
                                    {new Date(task.created_at).toLocaleString()}
                                </Typography>
                            </Grid>

                            {/* Updated At */}
                            <Grid item xs={6}>
                                <Typography variant="subtitle2">Updated At</Typography>
                                <Typography>
                                    {new Date(task.updated_at).toLocaleString()}
                                </Typography>
                            </Grid>

                        </Grid>

                        {/* ✅ ACTION BUTTONS */}
                        {canEdit && (
                            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleEdit}
                                >
                                    Edit Task
                                </Button>

                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={handleDelete}
                                >
                                    Delete Task
                                </Button>

                            </Stack>
                        )}

                    </CardContent>

                </Card>

                {/* Comments Section */}
                <Box sx={{ mt: 4 }}>
                    <CommentSection taskId={task.id} />
                </Box>

            </Container>
        </>
    );
}