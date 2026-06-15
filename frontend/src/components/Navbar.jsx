import { AppBar, Toolbar, Typography, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        navigate("/login");
    };

    return (

        <AppBar position="static">

            <Toolbar>

                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1 }}
                >
                    Task Management System
                </Typography>

                <Button
                    color="inherit"
                    onClick={() => navigate("/")}
                >
                    Dashboard
                </Button>

                <Button
                    color="inherit"
                    onClick={logout}
                >
                    Logout
                </Button>

            </Toolbar>

        </AppBar>
    );
}