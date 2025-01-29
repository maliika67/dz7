import axios from 'axios'

export const createStudent = async (data, setPending, setPageType) => {
    try {
        setPending(true)
        const response = await axios.post('http://localhost:5000/students', {
            id: crypto.randomUUID(),
            firstName: data.firstName,
            lastName: data.lastName,
            groupId: data.groupId,
        })
        setPageType("home")
        return response.data
    } catch (e) {
        return null
    } finally {
        setPending(false)
    }
}

export const fetchStudents = async (setPending, setStudents) => {
    try {
        setPending(true)
        const response = await axios.get('http://localhost:5000/students')

        setStudents(response.data)
    } catch (e) {
        return null
    } finally {
        setPending(false)
    }
}

export const deleteStudent = async (id, setUpdatePage, setIsPending) => {
    try {
        setIsPending(true)
        const response = await axios.delete(`http://localhost:5000/students/${id}`)
        if (response.status === 200) setUpdatePage(prev => !prev)
    } catch (e) {
        return null
    } finally {
        setIsPending(false)
    }
}

export const updateStudent = async (id, newStudent, setUpdatePage, setIsPending) => {
    try {
        setIsPending(true)
        const response = await axios.put(`http://localhost:5000/students/${id}`, newStudent)
        if (response.status === 200) setUpdatePage(prev => !prev)
    } catch (e) {
        return null
    } finally {
        setIsPending(false)
    }
}