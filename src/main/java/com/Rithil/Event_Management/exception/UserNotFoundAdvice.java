package com.Rithil.Event_Management.exception;

import com.Rithil.Event_Management.model.Event;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class UserNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(EventNotFounException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String,String> exceptionHandler(EventNotFounException exception){
        Map<String,String> errorMap= new HashMap<>();
        errorMap.put("Errormessege",exception.getMessage());

        return  errorMap;
    }
}
