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
    @Autowired
    private AttendeeRepository attendeeRepository;

    //saving the event
    @Override
    public Event saveEvent(Event event) {
        for (Attendee attendee : event.getAttendees()) {
            attendee.setEvent(event);
        }
        return eventRepository.save(event);
    }

    //getting all events
    @Override
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    //getting event by id
    @Override
    public Optional<Event> getEventById(int id) {
        return eventRepository.findById(id);
    }

    //delete evrnt
    @Override
    public void deleteEventById(int id) {
        eventRepository.deleteById(id);
    }

    //register an atendee
    @Override
    public Attendee registerAttendee(int eventId, Attendee attendee) {
        Event event = eventRepository.findById(eventId).orElseThrow(() -> new EventNotFounException(eventId));
        attendee.setEvent(event);
        return attendeeRepository.save(attendee);
    }

    //getting atendee by id
    @Override
    public List<Attendee> getAttendeeByEvent(int eventId) {
        Event event = eventRepository.findById(eventId).orElseThrow(()-> new EventNotFounException(eventId));
        return event.getAttendees();
    }

}
