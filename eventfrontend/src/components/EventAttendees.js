import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const EventAttendees = ({ eventId }) => {
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/event/${eventId}/attendees`)
      .then((res) => res.json())
      .then((data) => {
        setAttendees(data);
      });
  }, [eventId]);

  return (
    <Container>
      <Paper
        elevation={3}
        style={{ padding: "20px", margin: "20px auto", maxWidth: 600 }}
      >
        <Typography variant="h5" color="primary" gutterBottom>
          Attendees
        </Typography>
        <List>
          {attendees.map((attendee) => (
            <ListItem key={attendee.id}>
              <ListItemText primary={attendee.name} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default EventAttendees;
