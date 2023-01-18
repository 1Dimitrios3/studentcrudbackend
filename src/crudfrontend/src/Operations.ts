import { errorNotification, successNotification } from "./Notification";
import { addStudent, deleteStudent, updateStudent } from "./StudentService";
import { ErrorResponse, Student } from "./types";

export const createStudent = (
    values: Student,
    callBack: () => void,
    onClose: () => void,
    setIsLoading: (state: boolean) => void
) => {
    addStudent(values)
    .then(() => {
            onClose();
            successNotification(
                'Student successfully added',
                `${values.name} was added to the list!`
                );
                callBack();
    }).catch((err: any) => {
        err.response.json()
            .then((res: ErrorResponse) => {
                errorNotification(
                    'There was an issue',
                    `${res.message} [statusCode]: ${res.status} [${res.error}] `,
                    'bottomLeft'
                )
            });
    })
    .finally(() => {
        setIsLoading(false);
    })
}

export const editStudent = (
    values: Student,
    callBack: () => void,
    onClose: () => void,
    setIsLoading: (state: boolean) => void
    ) => {
    updateStudent(values)
    .then(() => {
      onClose();
      successNotification("Student updated", `Student with id: ${values.id} was successfully updated`);
      callBack();
    }).catch((err: any) => {
      err.response.json().then((res: ErrorResponse) => {
        errorNotification(
          "There was an issue",
          `${res.message} [${res.status}] [${res.error}]`
      )
      })
    }).finally(() => {
        setIsLoading(false);
    })
}


  export const removeStudent = (studentId: number, callback: () => void) => {
    deleteStudent(studentId)
      .then(() => {
        successNotification("Student deleted", `Student with id: ${studentId} was successfully deleted`);
        callback();
      }).catch((err: any) => {
        err.response.json().then((res: ErrorResponse) => {
          errorNotification(
            "There was an issue",
            `${res.message} [${res.status}] [${res.error}]`
        )
        })
      })
  }