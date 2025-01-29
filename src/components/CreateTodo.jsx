import {useState} from "react";
import {createStudent} from "../api/todos.api.js";


export const CreateStudent = ({ setIsPending, setPageType }) => {
    const [student, setStudent] = useState({
        firstName: '',
        lastName: '',
        groupId: '',
    });

    const handleInputChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = () => {
        if (!student.firstName || !student.lastName || !student.groupId) return
        createStudent(student, setIsPending, setPageType)
    }

    return <form>
        <input onChange={handleInputChange} type="text" name="firstName" placeholder="First name" required/>
        <input onChange={handleInputChange} type="text" name="lastName" placeholder="Last name" required/>
        <input onChange={handleInputChange} type="text" name="groupId" placeholder="Group ID" required/>
        <button onClick={handleSubmit}>Create</button>
    </form>
}