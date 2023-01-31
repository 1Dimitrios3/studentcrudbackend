package com.demo.fullstack.student;

import com.demo.fullstack.student.exception.BadRequestException;
import com.demo.fullstack.student.exception.StudentNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class StudentServiceTest {
    @Mock
    private StudentRepo studentRepo;
    private StudentService testService;

    @BeforeEach
    void setUp() {
        testService = new StudentService(studentRepo);
    }

    @Test
    void canGetAllStudents() {
        testService.getAllStudents();
        verify(studentRepo).findAll();
    }

    @Test
    void canAddStudent() {
        Student mockStudent = new Student(
                "test_user",
                "testuser@gmail.com",
                Gender.MALE
        );
        testService.addStudent(mockStudent);

        ArgumentCaptor<Student> studentArgumentCaptor =
                ArgumentCaptor.forClass(Student.class);

        verify(studentRepo).save(studentArgumentCaptor.capture());

        Student capturedStudent = studentArgumentCaptor.getValue();

        assertThat(capturedStudent).isEqualTo(mockStudent);
    }

    @Test
    void willThrowWhenEmailIsFound() {
        Student mockStudent = new Student(
                "test_user",
                "testuser@gmail.com",
                Gender.MALE
        );

        given(studentRepo.selectFoundEmail(mockStudent.getEmail()))
                .willReturn(true);

        assertThatThrownBy(() -> testService.addStudent(mockStudent))
                .isInstanceOf(BadRequestException.class)
                .hasMessageContaining("Email " + mockStudent.getEmail() + " already exists");

        verify(studentRepo, Mockito.never()).save(Mockito.any());
    }

    @Test
    void canUpdateStudent() {
        Long id = 10L;
        Student mockStudentDetails = new Student(
                "test_user",
                "testuser@gmail.com",
                Gender.MALE
        );

        given(studentRepo.findById(id))
                .willReturn(Optional.of(mockStudentDetails));

        testService.updateStudent(id, mockStudentDetails);

        ArgumentCaptor<Student> studentArgumentCaptor =
                ArgumentCaptor.forClass(Student.class);

        verify(studentRepo).save(studentArgumentCaptor.capture());

        Student capturedStudent = studentArgumentCaptor.getValue();

        assertThat(capturedStudent).isEqualTo(mockStudentDetails);
    }

    @Test
    void canDeleteStudent() {

        Long id = 10L;
        given(studentRepo.existsById(id))
                .willReturn(true);

        testService.deleteStudent(id);

        verify(studentRepo).deleteById(id);
    }

    @Test
    void willThrowWhenDeleteStudentNotFound() {
        Long id = 10L;
        given(studentRepo.existsById(id))
                .willReturn(false);

        assertThatThrownBy(() -> testService.deleteStudent(id))
                .isInstanceOf(StudentNotFoundException.class)
                .hasMessageContaining("Student with id " + id + " does not exist");

        verify(studentRepo, Mockito.never()).deleteById(Mockito.any());
    }
}