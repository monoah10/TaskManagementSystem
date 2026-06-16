import { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    Stack,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import api from "../api/axios";
import { toast } from "react-toastify";

export default function CategoryModal({ open, onClose, isAdmin }) {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [editId, setEditId] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (open) fetchCategories();
    }, [open]);

    const fetchCategories = async () => {
        const res = await api.get("/categories/");
        setCategories(res.data);
    };

    const handleSubmit = async () => {

        if (!name.trim()) return;

        try {

            const exists = categories.find(
                (c) => c.name.toLowerCase() === name.toLowerCase()
            );

            if (exists && !editId) {
                toast.error("Category already exists");
                return;
            }

            if (editId) {
                await api.put(`/categories/${editId}/`, { name });
                toast.success("Updated");
            } else {
                await api.post("/categories/", { name });
                toast.success("Created");
            }

            setName("");
            setEditId(null);
            fetchCategories();

        } catch (err) {
            console.error(err);
            const message =
                err.response?.data?.detail ||
                err.response?.data?.message ||
                "Operation failed";
            toast.error(message);
}
    };

    const handleEdit = (cat) => {
        setName(cat.name);
        setEditId(cat.id);
    };

    const handleDelete = async (id) => {
        await api.delete(`/categories/${id}/`);
        toast.success("Deleted");
        fetchCategories();
    };

    const filtered = categories.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">

            <DialogTitle>
                📂 Category Management
            </DialogTitle>

            <DialogContent>

                {/* Search */}
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Search categories..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{ mb: 2 }}
                />

                {/* Create / Edit */}
                {isAdmin && (
                    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Category name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <Button variant="contained" onClick={handleSubmit}>
                            {editId ? "Update" : "Add"}
                        </Button>
                    </Stack>
                )}

                {/* List */}
                <List>

                    {filtered.map((cat) => (
                        <ListItem
                            key={cat.id}
                            secondaryAction={
                                isAdmin && (
                                    <>
                                        <IconButton onClick={() => handleEdit(cat)}>
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton onClick={() => handleDelete(cat.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </>
                                )
                            }
                        >
                            <ListItemText primary={cat.name} />
                        </ListItem>
                    ))}

                </List>

                {!isAdmin && (
                    <Typography variant="caption" color="text.secondary">
                        Read-only mode (Admin only can manage categories)
                    </Typography>
                )}

            </DialogContent>

        </Dialog>
    );
}