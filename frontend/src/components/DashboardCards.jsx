import { Grid, Card, CardContent, Typography, Box } from "@mui/material";

export default function DashboardCards({ stats }) {

    const cards = [
        {
            title: "Total Tasks",
            value: stats.total_tasks || 0,
            color: "#3b82f6",
        },
        {
            title: "Pending",
            value: stats.pending_tasks || 0,
            color: "#f59e0b",
        },
        {
            title: "In Progress",
            value: stats.in_progress_tasks || 0,
            color: "#6366f1",
        },
        {
            title: "Completed",
            value: stats.completed_tasks || 0,
            color: "#22c55e",
        },
    ];

    return (
        <Grid container spacing={2}>

            {cards.map((card, index) => (

                <Grid item xs={12} sm={6} md={3} key={index}>

                    <Card
                        sx={{
                            borderRadius: 3,
                            boxShadow: 2,
                            transition: "0.2s",
                            "&:hover": {
                                transform: "translateY(-4px)",
                                boxShadow: 6,
                            },
                        }}
                    >

                        <CardContent>

                            {/* Colored accent bar */}
                            <Box
                                sx={{
                                    width: "40px",
                                    height: "4px",
                                    backgroundColor: card.color,
                                    borderRadius: 2,
                                    mb: 2,
                                }}
                            />

                            {/* Title */}
                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                            >
                                {card.title}
                            </Typography>

                            {/* Value */}
                            <Typography
                                variant="h4"
                                sx={{ fontWeight: "bold", mt: 1 }}
                            >
                                {card.value}
                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

            ))}

        </Grid>
    );
}