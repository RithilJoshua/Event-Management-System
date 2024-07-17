import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Appbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#506080",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: "'Roboto', sans-serif",
              fontWeight: 500,
              letterSpacing: "0.05em",
              textAlign: "center",
              color: "#e3f2fd",
            }}
          >
            Event Manager Application
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
