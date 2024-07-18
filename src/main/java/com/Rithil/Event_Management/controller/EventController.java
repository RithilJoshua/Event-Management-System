package com.Rithil.Event_Management.controller;

import com.Rithil.Event_Management.exception.EventNotFounException;
import com.Rithil.Event_Management.model.Attendee;
import com.Rithil.Event_Management.model.Event;
import com.Rithil.Event_Management.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/event")
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class EventController {
    @Autowired
    private EventService eventService;

    @PostMapping("/add")
    public String add(@RequestBody Event event){
        eventService.saveEvent(event);
        return "New Event is added";
    }

    @GetMapping("/getAll")
    public List<Event> getAllEvents(){
        return eventService.getAllEvents();
    }

    @GetMapping("/{id}")
    Event getEventByID(@PathVariable int id){
        return eventService.getEventById(id)
                .orElseThrow(()-> new EventNotFounException(id));
    }

    @PutMapping("/update/{id}")
    public Event updateEvent(@PathVariable int id, @RequestBody Event eventDetails) {
        Event event = eventService.getEventById(id)
                .orElseThrow(() -> new EventNotFounException(id));

        event.setName(eventDetails.getName());
        event.setDescription(eventDetails.getDescription());
        event.setDate(eventDetails.getDate());
        event.setLocation(eventDetails.getLocation());
        event.setAttendees(eventDetails.getAttendees());

        return eventService.saveEvent(event);
    }

    @DeleteMapping("/{id}")
    public String deleteEvent(@PathVariable int id){
        eventService.getEventById(id)
                .orElseThrow(() -> new EventNotFounException(id));
        eventService.deleteEventById(id);
        return "Event with ID " + id + " has been deleted.";
    }

    @PostMapping("/{eventId}/register")
    public Attendee registerAttendee(@PathVariable int eventId, @RequestBody Attendee attendee) {
        return eventService.registerAttendee(eventId, attendee);
    }

    @GetMapping("/{eventId}/attendees")
    public List<Attendee> getAttendeeByEvent(@PathVariable int eventId){
        return eventService.getAttendeeByEvent(eventId);
    }

}
