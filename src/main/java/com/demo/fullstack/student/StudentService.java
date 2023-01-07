package com.demo.fullstack.student;

import com.demo.fullstack.student.exception.BadRequestException;
import com.demo.fullstack.student.exception.StudentNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class StudentService {

    private final StudentRepo studentRepo;

    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }

    public void addStudent(Student student) {
        Boolean foundEmail = studentRepo
                .selectFoundEmail(student.getEmail());
        if (foundEmail) {
            throw new BadRequestException(
                    "Email " + student.getEmail() + " already exists"
            );
        }
        studentRepo.save(student);
    }

    public void deleteStudent(Long id) {
        Boolean foundStudent = studentRepo.existsById((id));
        if (!foundStudent) {
            throw new StudentNotFoundException(
                    "Student with id " + id + " does not exist"
            );
        }
        studentRepo.deleteById(id);
    }
}
