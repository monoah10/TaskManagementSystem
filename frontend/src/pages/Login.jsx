import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

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
    Divider,
} from "@mui/material";

import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

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

            const response = await api.post(
                "/token/",
                form
            );

            localStorage.setItem(
                "access",
                response.data.access
            );

            localStorage.setItem(
                "refresh",
                response.data.refresh
            );

            login(response.data.access);

            navigate("/");

        } catch (err) {

            console.error(err);

            setError(
                "Invalid username or password"
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
            }}
        >
            <Container maxWidth="sm">

                <Card
                    sx={{
                        borderRadius: 4,
                        boxShadow: 10,
                    }}
                >
                    <CardContent sx={{ p: 5 }}>

                        {/* Logo */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                mb: 3,
                            }}
                        >
                            <AssignmentTurnedInIcon
                                color="primary"
                                sx={{
                                    fontSize: 60,
                                    mb: 1,
                                }}
                            />

                            <Typography
                                variant="h4"
                                fontWeight="bold"
                            >
                                Task Manager
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Manage tasks, comments and teams
                            </Typography>
                        </Box>

                        <Divider sx={{ mb: 3 }} />

                        {error && (
                            <Alert
                                severity="error"
                                sx={{ mb: 2 }}
                            >
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
                                required
                            />

                            <TextField
                                fullWidth
                                type="password"
                                label="Password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                margin="normal"
                                required
                            />

                            <Button
                                fullWidth
                                variant="contained"
                                type="submit"
                                disabled={loading}
                                size="large"
                                sx={{
                                    mt: 3,
                                    py: 1.4,
                                    borderRadius: 2,
                                }}
                            >
                                {loading ? (
                                    <CircularProgress
                                        size={24}
                                        color="inherit"
                                    />
                                ) : (
                                    "Sign In"
                                )}
                            </Button>

                        </form>

                        {/* Register */}
                        <Box
                            sx={{
                                mt: 3,
                                textAlign: "center",
                            }}
                        >
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Don't have an account?
                            </Typography>

                            <Button
                                component={Link}
                                to="/register"
                                size="small"
                            >
                                Create Account
                            </Button>
                        </Box>

                        {/* Footer */}
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                            textAlign="center"
                            sx={{ mt: 3 }}
                        >
                            Task Management System • React + Django + JWT
                        </Typography>

                    </CardContent>
                </Card>

            </Container>
        </Box>
    );
}