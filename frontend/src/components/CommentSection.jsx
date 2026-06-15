import { useEffect, useState } from "react";

import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Avatar,
    Box,
    Divider,
    Stack,
    IconButton,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import api from "../api/axios";

export default function CommentSection({ taskId }) {

    const [comments, setComments] = useState([]);
    const [editId, setEditId] = useState(null);
    const [text, setText] = useState("");

    useEffect(() => {
        fetchComments();
    }, [taskId]);

    const fetchComments = async () => {
        try {
            const res = await api.get(`/tasks/${taskId}/comments/`);
            setComments(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // START EDIT
    const editComment = (c) => {
        setText(c.comment);
        setEditId(c.id);
    };

    // CANCEL EDIT
    const cancelEdit = () => {
        setText("");
        setEditId(null);
    };

    // CREATE / UPDATE COMMENT
    const handleSubmit = async () => {

        if (!text.trim()) return;

        try {

            if (editId) {
                await api.put(`/comments/${editId}/`, {
                    comment: text,
                });
            } else {
                await api.post(`/tasks/${taskId}/comments/`, {
                    comment: text,
                });
            }

            setText("");
            setEditId(null);
            fetchComments();

        } catch (err) {
            console.error(err);
            alert("Failed to save comment");
        }
    };

    const deleteComment = async (id) => {

        const ok = window.confirm("Delete comment?");
        if (!ok) return;

        try {
            await api.delete(`/comments/${id}/`);
            fetchComments();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Card sx={{ mt: 4, p: 2, borderRadius: 3, boxShadow: 3 }}>

            <CardContent>

                <Typography variant="h6" sx={{ mb: 2 }}>
                    💬 Comments
                </Typography>

                <Divider sx={{ mb: 2 }} />

                {/* Input Box */}
                <Box sx={{ display: "flex", gap: 2, mb: 3 }}>

                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Write a comment..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        {editId ? "Update" : "Post"}
                    </Button>

                    {editId && (
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={cancelEdit}
                        >
                            Cancel
                        </Button>
                    )}

                </Box>

                {/* Comments List */}
                {comments.length === 0 ? (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        No comments yet. Be the first to comment.
                    </Typography>
                ) : (
                    <Stack spacing={2}>

                        {comments.map((c) => (

                            <Box
                                key={c.id}
                                sx={{
                                    display: "flex",
                                    gap: 2,
                                    alignItems: "flex-start",
                                    p: 1.5,
                                    borderRadius: 2,
                                    backgroundColor: "#f9fafb",
                                }}
                            >

                                {/* Avatar */}
                                <Avatar>
                                    {c.user?.username?.charAt(0).toUpperCase()}
                                </Avatar>

                                {/* Content */}
                                <Box sx={{ flex: 1 }}>

                                    <Typography
                                        variant="subtitle2"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        {c.user?.username}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{ mt: 0.5 }}
                                    >
                                        {c.comment}
                                    </Typography>

                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        {new Date(c.created_at).toLocaleString()}
                                    </Typography>

                                </Box>

                                {/* Actions */}
                                <Box sx={{ display: "flex", gap: 1 }}>

                                    <IconButton
                                        size="small"
                                        onClick={() => editComment(c)}
                                    >
                                        <EditIcon fontSize="small" />
                                    </IconButton>

                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => deleteComment(c.id)}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>

                                </Box>

                            </Box>

                        ))}

                    </Stack>
                )}

            </CardContent>

        </Card>
    );
}