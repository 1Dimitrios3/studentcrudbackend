package com.demo.fullstack.student;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.AfterEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
class StudentRepoTest  {

    @Autowired
    private StudentRepo testRepo;

    @AfterEach
    void tearDown() {
        testRepo.deleteAll();
    }

    @Test
    void itShouldCheckThatStudentEmailIsFound() {
        String email = "testuser@gmail.com";
        Student mockStudent = new Student(
            "test_user",
            email,
            Gender.MALE
        );
        testRepo.save(mockStudent);

        boolean studentEmailFound = testRepo.selectFoundEmail(email);

        assertThat(studentEmailFound).isTrue();
    }

    @Test
    void itShouldCheckThatStudentEmailIsNotFound() {
        String email = "testuser@gmail.com";

        boolean studentEmailFound = testRepo.selectFoundEmail(email);

        assertThat(studentEmailFound).isFalse();
    }
}