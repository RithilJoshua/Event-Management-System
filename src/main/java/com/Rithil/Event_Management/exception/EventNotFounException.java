package com.Rithil.Event_Management.exception;

public class EventNotFounException extends RuntimeException {
    public EventNotFounException(int id){
        super("Could not found an event with id" +  id);
    }
}
