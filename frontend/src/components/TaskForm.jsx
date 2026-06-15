import { useEffect, useState } from "react";

import {
    Card,
    CardContent,
    TextField,
    Button,
    MenuItem,
    Grid,
    Typography,
    Stack,
    Divider,
    Box,
} from "@mui/material";

import api from "../api/axios";
import { toast } from "react-toastify";
import {
    InputAdornment,
    IconButton
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function TaskForm({
    selectedTask,
    setSelectedTask,
    onTaskCreated,
}) {

    const [categories, setCategories] = useState([]);

    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "",
        assigned_to: 1,
        priority: "MEDIUM",
        status: "PENDING",
        due_date: "",
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {

        if (selectedTask) {
            setForm({
                title: selectedTask.title || "",
                description: selectedTask.description || "",
                category: selectedTask.category || "",
                assigned_to: selectedTask.assigned_to || 1,
                priority: selectedTask.priority || "MEDIUM",
                status: selectedTask.status || "PENDING",
                due_date: selectedTask.due_date || "",
            });
        }

    }, [selectedTask]);

    const fetchCategories = async () => {
        try {
            const res = await api.get("/categories/");
            setCategories(res.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load categories");
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const resetForm = () => {
        setForm({
            title: "",
            description: "",
            category: "",
            assigned_to: 1,
            priority: "MEDIUM",
            status: "PENDING",
            due_date: "",
        });
        setSelectedTask(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (selectedTask) {
                await api.put(`/tasks/${selectedTask.id}/`, form);
                toast.success("Task updated successfully");
            } else {
                await api.post("/tasks/", form);
                toast.success("Task created successfully");
            }

            resetForm();
            onTaskCreated();

        } catch (err) {
            console.error(err);
            toast.error("Operation failed");
        }
    };

    return (
        <Card
            sx={{
                mt: 3,
                mb: 3,
                borderRadius: 3,
                boxShadow: 3,
            }}
        >

            <CardContent>

                {/* Header */}
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h6">
                        {selectedTask
                            ? "✏️ Update Task"
                            : "✨ Create New Task"}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Fill in the details below
                    </Typography>
                </Box>

                <Divider sx={{ mb: 3 }} />

                <form onSubmit={handleSubmit}>

                    <Grid container spacing={2}>

                        {/* Title */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Task Title"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                            />
                        </Grid>

                        {/* Description */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                multiline
                                rows={3}
                                value={form.description}
                                onChange={handleChange}
                            />
                        </Grid>

                        {/* Category */}
<Grid item xs={6}>
    <TextField
        select
        fullWidth
        label="Category"
        name="category"
        value={form.category}
        onChange={handleChange}
        InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton
                        size="small"
                        onClick={async () => {
                            const name = prompt("Enter new category name");

                            if (!name || !name.trim()) return;

                            try {
                                const res = await api.post("/categories/", {
                                    name: name.trim(),
                                });

                                // update dropdown instantly
                                setCategories((prev) => [...prev, res.data]);

                                toast.success("Category created");
                            } catch (err) {
                                console.error(err);
                                toast.error("Failed to create category");
                            }
                        }}
                    >
                        <AddIcon fontSize="small" />
                    </IconButton>
                </InputAdornment>
            )
        }}
    >
        {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
            </MenuItem>
        ))}
    </TextField>
</Grid>

                        {/* Priority */}
                        <Grid item xs={6}>
                            <TextField
                                select
                                fullWidth
                                label="Priority"
                                name="priority"
                                value={form.priority}
                                onChange={handleChange}
                            >
                                <MenuItem value="LOW">LOW</MenuItem>
                                <MenuItem value="MEDIUM">MEDIUM</MenuItem>
                                <MenuItem value="HIGH">HIGH</MenuItem>
                            </TextField>
                        </Grid>

                        {/* Status */}
                        <Grid item xs={6}>
                            <TextField
                                select
                                fullWidth
                                label="Status"
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                            >
                                <MenuItem value="PENDING">PENDING</MenuItem>
                                <MenuItem value="IN_PROGRESS">IN PROGRESS</MenuItem>
                                <MenuItem value="COMPLETED">COMPLETED</MenuItem>
                            </TextField>
                        </Grid>

                        {/* Due Date */}
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                type="date"
                                name="due_date"
                                value={form.due_date}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        {/* Buttons */}
                        <Grid item xs={12}>
                            <Stack direction="row" spacing={2}>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    {selectedTask
                                        ? "Update Task"
                                        : "Create Task"}
                                </Button>

                                {selectedTask && (
                                    <Button
                                        variant="outlined"
                                        onClick={resetForm}
                                    >
                                        Cancel
                                    </Button>
                                )}

                            </Stack>
                        </Grid>

                    </Grid>

                </form>

            </CardContent>

        </Card>
    );
}