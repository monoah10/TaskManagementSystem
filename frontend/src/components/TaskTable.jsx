import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Button,
    Chip,
    Stack,
} from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function TaskTable({
    tasks,
    setSelectedTask,
    reloadTasks,
}) {

    const navigate = useNavigate();

    const handleDelete = async (taskId) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmed) return;

        try {
            await api.delete(`/tasks/${taskId}/`);
            alert("Task deleted");
            reloadTasks();
        } catch (error) {
            console.error(error);
            alert("Failed to delete task");
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "COMPLETED":
                return "success";
            case "IN_PROGRESS":
                return "primary";
            default:
                return "warning";
        }
    };
    const { user } = useContext(AuthContext);
    const getPriorityColor = (priority) => {
        switch (priority) {
            case "HIGH":
                return "error";
            case "MEDIUM":
                return "warning";
            default:
                return "success";
        }
    };

    return (
        <Paper
            sx={{
                mt: 3,
                borderRadius: 3,
                overflow: "hidden",
            }}
        >

            <Table>

                {/* Header */}
                <TableHead sx={{ backgroundColor: "#f9fafb" }}>
                    <TableRow>
                        <TableCell><b>Title</b></TableCell>
                        <TableCell><b>Status</b></TableCell>
                        <TableCell><b>Priority</b></TableCell>
                        <TableCell><b>Due Date</b></TableCell>
                        <TableCell align="center"><b>Actions</b></TableCell>
                    </TableRow>
                </TableHead>

                {/* Body */}
                <TableBody>

                    {(tasks || []).map((task) => (

                        <TableRow
                            key={task.id}
                            hover
                            sx={{
                                "&:hover": {
                                    backgroundColor: "#f5f7fb",
                                },
                            }}
                        >

                            {/* Title */}
                            <TableCell>
                                <b>{task.title}</b>
                            </TableCell>

                            {/* Status */}
                            <TableCell>
                                <Chip
                                    label={task.status}
                                    size="small"
                                    color={getStatusColor(task.status)}
                                />
                            </TableCell>

                            {/* Priority */}
                            <TableCell>
                                <Chip
                                    label={task.priority}
                                    size="small"
                                    color={getPriorityColor(task.priority)}
                                />
                            </TableCell>

                            {/* Due Date */}
                            <TableCell>
                                {task.due_date}
                            </TableCell>

                            {/* Actions */}
                            <TableCell align="center">

                                <Stack
                                    direction="row"
                                    spacing={1}
                                    justifyContent="center"
                                >

                                    <Button
                                        size="small"
                                        variant="outlined"
                                        onClick={() =>
                                            navigate(`/tasks/${task.id}`)
                                        }
                                    >
                                        View
                                    </Button>

                                    {(user?.is_staff || task.assigned_to === user?.id) && (
    <>
        <Button
            size="small"
            variant="contained"
            onClick={() => setSelectedTask(task)}
        >
            Edit
        </Button>

        <Button
            size="small"
            color="error"
            variant="contained"
            onClick={() => handleDelete(task.id)}
        >
            Delete
        </Button>
    </>
)}

                                </Stack>

                            </TableCell>

                        </TableRow>

                    ))}

                </TableBody>

            </Table>

        </Paper>
    );
}