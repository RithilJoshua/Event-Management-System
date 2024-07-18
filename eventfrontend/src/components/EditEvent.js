import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Paper, Button, Typography } from "@mui/material";

export default function EditEvent({ event, onClose, onEventUpdated }) {
  const paperStyle = {
    padding: "50px 20px",
    margin: "20px auto",
    maxWidth: 800,
  };
  const [name, setName] = useState(event.name);
  const [description, setDescription] = useState(event.description);
  const [date, setDate] = useState(event.date);
  const [location, setLocation] = useState(event.location);

  const handleClick = (e) => {
    e.preventDefault();
    const updatedEvent = { ...event, name, description, date, location };
    fetch(`http://localhost:8080/event/update/${event.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedEvent),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then(() => {
        onEventUpdated();
        onClose();
      })
      .catch((error) => {
        console.error("There was an error with the fetch operation:", error);
      });
  };

  return (
    <Paper elevation={3} style={paperStyle}>
      <Typography variant="h4" color="primary" gutterBottom>
        Edit Event
      </Typography>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="event-name"
          label="Event Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="event-description"
          label="Event Description"
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          id="event-date"
          label="Date"
          type="date"
          variant="outlined"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id="event-location"
          label="Location"
          variant="outlined"
          fullWidth
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Save
          </Button>
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
