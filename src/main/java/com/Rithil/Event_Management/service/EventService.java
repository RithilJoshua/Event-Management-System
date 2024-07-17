package com.Rithil.Event_Management.service;
import java.util.Optional;

import com.Rithil.Event_Management.model.Attendee;
import com.Rithil.Event_Management.model.Event;

import java.util.List;

public interface EventService {
    public Event saveEvent(Event event);
    public List<Event> getAllEvents();
    Optional<Event> getEventById(int id);
    void deleteEventById(int id);
    Attendee registerAttendee(int eventId, Attendee attendee);
}
