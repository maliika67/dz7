import {useEffect, useState} from "react";
import {deleteStudent, fetchStudents, updateStudent} from "./api/todos.api.js";
import {CreateStudent} from "./components/CreateTodo.jsx";
import {UpdateStudent} from "./components/UpdateStudent.jsx";


export const App = () => {
    const [students, setStudents] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [pageType, setPageType] = useState("home");
    const [updatePage, setUpdatePage] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editStudentId, setEditStudentId] = useState(false);


    useEffect(() => {
        fetchStudents(setIsPending, setStudents)
    }, [fetchStudents, pageType, updatePage])


    if (isPending) return <h2>LOADING...</h2>

    return (
        <div>
            <h1>{pageType === "home" ? "Students List" : "Create New Student"}</h1>
            <nav>
                <p onClick={() => setPageType(("home"))} style={{cursor: "pointer"}}>Students list</p>
                <p onClick={() => setPageType(("form"))} style={{cursor: "pointer"}}>New students</p>
            </nav>
            {pageType === "home" && (
                <ul>
                    {students.map((student, idx) => (
                        <li key={student.id} style={{display: "flex", alignItems: "center", gap: 20}}>
                            <p>{idx + 1})</p>
                            {isEditing && editStudentId === student.id ?
                                <UpdateStudent
                                    id={student.id}
                                    currentStudent={student}
                                    setUpdatePage={setUpdatePage}
                                    setIsPending={setIsPending}
                                    setIsEditing={() => setIsEditing(prev => !prev)}
                                /> : (
                                <>
                                    <p>{student.firstName}</p>
                                    <p>{student.lastName}</p>
                                    <p>{student.groupId || "no data"}</p>
                                    <button onClick={() => {
                                        setIsEditing(prev => !prev)
                                        setEditStudentId(student.id)
                                    }}>{"Update"}</button>
                                </>
                            )}
                            {!isEditing &&
                                <button onClick={() => deleteStudent(student.id, setUpdatePage, setIsPending)}>{"Delete"}</button>}
                            {isEditing && <button onClick={() => setIsEditing(false)}>{"Cancel"}</button>}
                        </li>
                    ))}
                </ul>
            )}
            {pageType === "form" && (
                <CreateStudent setIsPending={setIsPending} setPageType={setPageType} setUpdatePage={setUpdatePage}/>
            )}
        </div>
    )
}

