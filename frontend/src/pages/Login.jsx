import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
    Container,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
    CircularProgress,
} from "@mui/material";

import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Login() {

    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await api.post("/token/", form);

            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);

            login(response.data.access);

            navigate("/");
        } catch (err) {
            console.error(err);
            setError("Invalid username or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">

            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >

                <Card
                    sx={{
                        width: "100%",
                        p: 3,
                        boxShadow: 5,
                        borderRadius: 3,
                    }}
                >

                    <CardContent>

                        <Typography
                            variant="h4"
                            textAlign="center"
                            gutterBottom
                        >
                            Task Manager
                        </Typography>

                        <Typography
                            variant="body2"
                            textAlign="center"
                            color="text.secondary"
                            sx={{ mb: 3 }}
                        >
                            Sign in to continue
                        </Typography>

                        {error && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit}>

                            <TextField
                                fullWidth
                                label="Username"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                margin="normal"
                            />

                            <TextField
                                fullWidth
                                type="password"
                                label="Password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                margin="normal"
                            />

                            <Button
                                fullWidth
                                variant="contained"
                                type="submit"
                                disabled={loading}
                                sx={{ mt: 2, py: 1.2 }}
                            >
                                {loading ? (
                                    <CircularProgress
                                        size={22}
                                        color="inherit"
                                    />
                                ) : (
                                    "Login"
                                )}
                            </Button>

                        </form>

                    </CardContent>

                </Card>

            </Box>

        </Container>
    );
}