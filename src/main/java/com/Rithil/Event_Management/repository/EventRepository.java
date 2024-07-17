package com.Rithil.Event_Management.repository;

import com.Rithil.Event_Management.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository <Event, Integer>{
}
