package com.Rithil.Event_Management.service;

import com.Rithil.Event_Management.exception.EventNotFounException;
import com.Rithil.Event_Management.model.Attendee;
import com.Rithil.Event_Management.model.Event;
import com.Rithil.Event_Management.repository.AttendeeRepository;
import com.Rithil.Event_Management.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventServiceImplementation implements EventService {

    @Autowired
    private EventRepository eventRepository;
    private AttendeeRepository attendeeRepository;

    @Override
    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }

    @Override
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @Override
    public Optional<Event> getEventById(int id) {
        return eventRepository.findById(id);
    }

    @Override
    public void deleteEventById(int id) {
        eventRepository.deleteById(id);
    }

    @Override
    public Attendee registerAttendee(int eventId, Attendee attendee) {
        Event event = eventRepository.findById(eventId).orElseThrow(() -> new EventNotFounException(eventId));
        attendee.setEvent(event);
        return attendeeRepository.save(attendee);
    }

}
