import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container, Paper, Button } from "@mui/material";

export default function RegisterAttendee({ eventId, onAttendeeRegistered }) {
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const [name, setName] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const attendee = { name };
    fetch(`http://localhost:8080/event/${eventId}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(attendee),
    }).then(() => {
      onAttendeeRegistered();
      setName("");
    });
  };

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: "blue" }}>
          <u>Register an Attendee</u>
        </h1>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="attendee-name"
            label="Attendee Name"
            variant="filled"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button variant="contained" onClick={handleRegister}>
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
