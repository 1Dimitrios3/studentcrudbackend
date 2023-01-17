import fetch from 'unfetch';
import { Response, Student } from './types';

function checkStatus<T>(response: T): T {
    if ((response as Response).ok) {
        return response;
    }
    // convert non-2xx HTTP responses into errors:
    const error: any = new Error((response as Response).statusText);
    error.response = response;
    return Promise.reject(error) as T;
}

const getAllStudents = () =>
    fetch("api/v1/students")
        .then(checkStatus);


const addStudent = (student: Student) =>
    fetch("api/v1/students", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(student)
    }
).then(checkStatus);


const updateStudent = (student: Student) =>
    fetch(`api/v1/students/update/${student.id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(student)
    }).then(checkStatus);


const deleteStudent = (studentId: number) =>
    fetch(`api/v1/students/delete/${studentId}`, {
        method: 'DELETE'
    }).then(checkStatus);


export {
    getAllStudents,
    addStudent,
    updateStudent,
    deleteStudent
}
