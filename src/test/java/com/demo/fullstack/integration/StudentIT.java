package com.demo.fullstack.integration;

import com.demo.fullstack.student.Gender;
import com.demo.fullstack.student.Student;
import com.demo.fullstack.student.StudentRepo;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.javafaker.Faker;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.StringUtils;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@TestPropertySource(
        locations = "classpath:application-it.properties"
)
@AutoConfigureMockMvc
public class StudentIT {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private StudentRepo studentRepo;

    private final Faker faker = new Faker();


    @Test
    void canRegisterNewStudent() throws Exception {
        String name = String.format("%s %s", faker.name().firstName(), faker.name().lastName());

        Student mockStudent = new Student(
                name,
                String.format("%s@gmail.com", StringUtils.trimAllWhitespace(name.trim().toLowerCase())),
                Gender.MALE
        );

        ResultActions result = mockMvc
                .perform(post("/api/v1/students")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(mockStudent)));

        result.andExpect(status().isOk());
        List<Student> students = studentRepo.findAll();

        assertThat(students).usingElementComparatorIgnoringFields("id")
                .contains(mockStudent);
    }

    @Test
    void canDeleteStudent() throws Exception {
        String name = String.format("%s %s", faker.name().firstName(), faker.name().lastName());

        String email = String.format("%s@gmail.com", StringUtils.trimAllWhitespace(name.trim().toLowerCase()));

        Student mockStudent = new Student(
                name,
                email,
                Gender.MALE
        );

        mockMvc.perform(post("/api/v1/students")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(mockStudent)))
                .andExpect(status().isOk());

        MvcResult getStudentsResult = mockMvc.perform(get("/api/v1/students")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        String contentAsString = getStudentsResult
                .getResponse()
                .getContentAsString();

        List<Student> students = objectMapper.readValue(
                contentAsString,
                new TypeReference<>() {
                }
        );

        long id = students.stream()
                .filter(s -> s.getEmail().equals(mockStudent.getEmail()))
                .map(Student::getId)
                .findFirst()
                .orElseThrow(() ->
                        new IllegalStateException(
                                "student with email: " + email + "doesn't exist"
                        ));

        ResultActions result = mockMvc
                .perform(delete("/api/v1/students/delete/" + id));

        result.andExpect(status().isOk());
        boolean exists = studentRepo.existsById(id);
        assertThat(exists).isFalse();
    }
}
