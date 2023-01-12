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

    public void updateStudent(Long id, Student studentDetails) throws StudentNotFoundException {
        Student student = studentRepo.findById(id)
                .orElseThrow(() -> new StudentNotFoundException(
                        "Student with id " + id + " does not exist"
                ));
        student.setName(studentDetails.getName());
        student.setEmail(studentDetails.getEmail());
        student.setGender(studentDetails.getGender());

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
