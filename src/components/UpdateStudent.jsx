import {useState} from "react";
import {createStudent, updateStudent} from "../api/todos.api.js";


export const UpdateStudent = ({ id, currentStudent, setUpdatePage, setIsPending, setIsEditing }) => {
    const [student, setStudent] = useState({
        firstName: currentStudent.firstName,
        lastName: currentStudent.lastName,
        groupId: currentStudent.groupId,
    });

    const handleInputChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value,
        })
    }

    return <form>
        <input onChange={handleInputChange} value={student.firstName} type="text" name="firstName" placeholder="First name" required/>
        <input onChange={handleInputChange} value={student.lastName} type="text" name="lastName" placeholder="Last name" required/>
        <input onChange={handleInputChange} value={student.groupId} type="text" name="groupId" placeholder="Group ID" required/>
        <button onClick={() => {
            setIsEditing()
            updateStudent(id, student, setUpdatePage, setIsPending)
        }}>Update</button>
    </form>
}