package com.demo.fullstack.student;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepo
        extends JpaRepository<Student, Long> {
            @Query("" +
                    "SELECT CASE WHEN COUNT(s) > 0 THEN " +
                    "TRUE ELSE FALSE END " +
                    "FROM Student s " +
                    "WHERE s.email = ?1"
            )
            Boolean selectFoundEmail(String email);
}
