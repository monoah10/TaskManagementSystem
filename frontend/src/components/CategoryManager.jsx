import { useEffect, useState } from "react";

import {
    Card,
    CardContent,
    TextField,
    Button,
    Stack,
    Typography,
    List,
    ListItem,
    ListItemText,
    IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import api from "../api/axios";
import { toast } from "react-toastify";

export default function CategoryManager() {

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await api.get("/categories/");
            setCategories(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async () => {

        if (!name.trim()) return;

        try {

            if (editId) {
                await api.put(`/categories/${editId}/`, { name });
                toast.success("Category updated");
            } else {
                await api.post("/categories/", { name });
                toast.success("Category created");
            }

            setName("");
            setEditId(null);
            fetchCategories();

        } catch (err) {
            console.error(err);
            toast.error("Error saving category");
        }
    };

    const handleEdit = (cat) => {
        setName(cat.name);
        setEditId(cat.id);
    };

    const handleDelete = async (id) => {
        await api.delete(`/categories/${id}/`);
        toast.success("Category deleted");
        fetchCategories();
    };

    return (
        <Card sx={{ mt: 3, p: 2, borderRadius: 3 }}>

            <CardContent>

                <Typography variant="h6" sx={{ mb: 2 }}>
                    📂 Categories
                </Typography>

                <Stack direction="row" spacing={2}>

                    <TextField
                        fullWidth
                        label="Category name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        {editId ? "Update" : "Create"}
                    </Button>

                </Stack>

                <List sx={{ mt: 2 }}>

                    {categories.map((cat) => (
                        <ListItem
                            key={cat.id}
                            secondaryAction={

                                <Stack direction="row" spacing={1}>

                                    <IconButton onClick={() => handleEdit(cat)}>
                                        <EditIcon />
                                    </IconButton>

                                    <IconButton onClick={() => handleDelete(cat.id)}>
                                        <DeleteIcon />
                                    </IconButton>

                                </Stack>

                            }
                        >
                            <ListItemText primary={cat.name} />
                        </ListItem>
                    ))}

                </List>

            </CardContent>

        </Card>
    );
}