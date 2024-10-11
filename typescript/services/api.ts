import { Student } from "../interfaces/mainPageModels.js";

const API_URL = 'https://studentwebapi.buchwaldshave34.dk/api';

export async function getStudents(includeRelations = false){
    const response = await fetch(`${API_URL}/Student/GetStudents?includeRelations=${includeRelations}`);
    return await response.json();
}

export async function  getStudent (id: number) {
    const response = await fetch (`${API_URL}/Student/GetStudent/${id}`);
    return await response.json();    
}

export async function createStudent (student: Student) {
    const response = await fetch(`${API_URL}/Student/CreateStudent`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            studentName: student.studentName, 
            studentLastName: student.studentLastName,
            teamID: student.team.teamID,
        }),
    });
 
    if (!response.ok) {
        const errorMessage = await response.text(); 
        throw new Error(`Failed to create student: ${errorMessage}`);
    }

    return;
}

export async function updateStudent (id: number, updatedFields:any){
    const response = await fetch(`${API_URL}/Student/UpdateStudent/${id}`, {
        method: 'PUT',
        headers: {'Content-Type' : 'application/JSON'},
        body: JSON.stringify(updatedFields)
    });
    return await response.json();
}
export async function deleteStudent(id: number){
    await fetch(`${API_URL}/Student/DeleteStudent/${id}`, {method: 'DELETE'});
}

export async function getCoursesByStudent(studentId: number){
    const response = await fetch(`${API_URL}/StudentCourse/GetCoursesWithStudentID/${studentId}`);
    return await response.json();
}

export async function addCourseToStudent(studentId: number, courseIds: number[]){
    for(const item in courseIds){
        const response = await fetch(`${API_URL}/StudentCourse/CreateStudentCourse`, {
            method: 'PUT',
            headers: { 'Content-Type' : 'application/JSON'},
            body: JSON.stringify({studentId, item})
        });
    }
}

export async function getAllCourses() {
    const response = await fetch(`${API_URL}/Course/GetCourses`);
    return await response.json();
}

export async function updateStudentCourses(studentId: number, courseIds: number[]){
    const response = await fetch(`${API_URL}/StudentCourse/UpdateStudentCourse/${studentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseIds })
    });
    return await response.json();
}

export async function deleteStudentCourses(studentId: number, courseIds: number[]){
    for (const id of courseIds) {
        try {
            const response = await fetch(`${'URL'}/StudentCourse/DeleteStudentCourse/${studentId}/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (!response.ok) {
                console.error(`Failed to delete course with id ${id}:`, response.statusText);
            }
        } catch (error) {
            console.error(`Error deleting course with id ${id}:`, error);
        }
    }
}

export async function createTeam(team: {name: string}){
    const response = await fetch(`${API_URL}/Team/CreateTeam`, {
        method: 'PUT',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({team})

    });
    return await response.json();
}

export async function updateteam(id: number, updatedFields: {teamName: string, teamId: number}){
    const response = await fetch(`${API_URL}/Team/UpdateTeam/${id}`, {
        method: 'PUT',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({updatedFields})
    });
    return await response.json();
}

