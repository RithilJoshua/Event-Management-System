import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Container,
  Paper,
  Button,
  IconButton,
  Grid,
  Typography,
} from "@mui/material";
import EditEvent from "./EditEvent";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

export default function Event() {
  const paperStyle = {
    padding: "50px 20px",
    margin: "20px auto",
    maxWidth: 800,
  };
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [attendees, setAttendees] = useState([{ name: "" }]);
  const [events, setEvents] = useState([]);
  const [editEvent, setEditEvent] = useState(null);
  const editRef = useRef(null);
  const dataPanelRef = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    const event = { name, description, date, location, attendees };
    fetch("http://localhost:8080/event/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    }).then(() => {
      fetchEvents();
      setName("");
      setDescription("");
      setDate("");
      setLocation("");
      setAttendees([{ name: "" }]);
      setTimeout(() => {
        dataPanelRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });
  };

  const fetchEvents = () => {
    fetch("http://localhost:8080/event/getAll")
      .then((res) => res.json())
      .then((result) => {
        setEvents(result);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEdit = (event) => {
    setEditEvent(event);
    setTimeout(() => {
      editRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/event/${id}`, {
      method: "DELETE",
    }).then(() => {
      fetchEvents();
    });
  };

  const handleAttendeeChange = (index, event) => {
    const newAttendees = [...attendees];
    newAttendees[index].name = event.target.value;
    setAttendees(newAttendees);
  };

  const handleAddAttendee = () => {
    setAttendees([...attendees, { name: "" }]);
  };

  const handleRemoveAttendee = (index) => {
    const newAttendees = [...attendees];
    newAttendees.splice(index, 1);
    setAttendees(newAttendees);
  };

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <Typography variant="h4" color="primary" gutterBottom>
          Add An Event
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
          <Typography variant="h6" gutterBottom>
            Attendees
          </Typography>
          {attendees.map((attendee, index) => (
            <Grid container spacing={1} alignItems="center" key={index}>
              <Grid item xs>
                <TextField
                  label={`Attendee ${index + 1}`}
                  variant="outlined"
                  fullWidth
                  value={attendee.name}
                  onChange={(e) => handleAttendeeChange(index, e)}
                />
              </Grid>
              <Grid item>
                <IconButton onClick={() => handleRemoveAttendee(index)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={handleAddAttendee}
            >
              Add Another Attendee
            </Button>
            <Button variant="contained" onClick={handleClick}>
              Submit
            </Button>
          </Box>
        </Box>
      </Paper>
      <Paper elevation={3} style={paperStyle} ref={dataPanelRef}>
        <Typography variant="h4" color="primary" gutterBottom>
          Events
        </Typography>
        {events.map((event) => (
          <Paper
            elevation={6}
            sx={{
              margin: "10px",
              padding: "15px",
              textAlign: "left",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            key={event.id}
          >
            <Box>
              <Typography variant="body1">
                <strong>Id:</strong> {event.id}
              </Typography>
              <Typography variant="body1">
                <strong>Name:</strong> {event.name}
              </Typography>
              <Typography variant="body1">
                <strong>Description:</strong> {event.description}
              </Typography>
              <Typography variant="body1">
                <strong>Date:</strong> {event.date}
              </Typography>
              <Typography variant="body1">
                <strong>Location:</strong> {event.location}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button variant="contained" onClick={() => handleEdit(event)}>
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(event.id)}
              >
                Delete
              </Button>
            </Box>
          </Paper>
        ))}
      </Paper>
      {editEvent && (
        <div ref={editRef}>
          <EditEvent
            event={editEvent}
            onClose={() => setEditEvent(null)}
            onEventUpdated={fetchEvents}
          />
        </div>
      )}
    </Container>
  );
}
