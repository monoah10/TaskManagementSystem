import { useState } from "react";
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
} from "@mui/material";

import api from "../api/axios";

export default function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {

            await api.post("/register/", {
                username: form.username,
                email: form.email,
                password: form.password,
            });

            setSuccess(
                "Account created successfully. Redirecting to login..."
            );

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (err) {

            console.error(err);

            if (err.response?.data) {
                const errors = Object.values(
                    err.response.data
                ).flat();

                setError(errors.join(" "));
            } else {
                setError("Registration failed");
            }

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
                        borderRadius: 4,
                        boxShadow: 6,
                    }}
                >

                    <CardContent>

                        <Typography
                            variant="h4"
                            textAlign="center"
                            fontWeight="bold"
                            gutterBottom
                        >
                            Create Account
                        </Typography>

                        <Typography
                            variant="body2"
                            textAlign="center"
                            color="text.secondary"
                            sx={{ mb: 3 }}
                        >
                            Join Task Manager and start tracking your work
                        </Typography>

                        {error && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        )}

                        {success && (
                            <Alert severity="success" sx={{ mb: 2 }}>
                                {success}
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
                                label="Email"
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                margin="normal"
                                required
                            />

                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                margin="normal"
                                required
                            />

                            <TextField
                                fullWidth
                                label="Confirm Password"
                                type="password"
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                margin="normal"
                                required
                            />

                            <Button
                                fullWidth
                                variant="contained"
                                type="submit"
                                disabled={loading}
                                sx={{
                                    mt: 3,
                                    py: 1.3,
                                    fontSize: "1rem",
                                }}
                            >
                                {loading ? (
                                    <CircularProgress
                                        size={22}
                                        color="inherit"
                                    />
                                ) : (
                                    "Create Account"
                                )}
                            </Button>

                        </form>

                        <Typography
                            variant="body2"
                            textAlign="center"
                            sx={{ mt: 3 }}
                        >
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                style={{
                                    textDecoration: "none",
                                    fontWeight: 600,
                                }}
                            >
                                Sign In
                            </Link>
                        </Typography>

                    </CardContent>

                </Card>

            </Box>

        </Container>
    );
}