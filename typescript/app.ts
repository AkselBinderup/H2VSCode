import { getStudents, createStudent, deleteStudent, getStudent, getCoursesByStudent, getAllCourses, addCourseToStudent } from './services/api.js';

const studentListElement = document.getElementById('student-list') as HTMLUListElement;
const studentDetailsElement = document.getElementById('student-details') as HTMLDivElement;
const studentHeaderElement = document.getElementById('student-details-h2') as any;


async function loadStudents() {
    const students = await getStudents();
    studentListElement.innerHTML = '';
    students.forEach((student: { studentID: number; studentName: string; studentLastName: string; team?: { teamName: string } }) => {
        const li = document.createElement('li');
        li.textContent = `${student.studentName} ${student.studentLastName} - Hold: ${student.team ? student.team.teamName : 'No team'}`;
        li.onclick = () => showStudentDetails(student.studentID);
        studentListElement.appendChild(li);
    });
}

async function showStudentDetails(studentId: number) {
    const student = await getStudent(studentId);
    studentDetailsElement.innerHTML = `
        <p>Navn: ${student.studentName} ${student.studentLastName}</p>
        <p>Hold: ${student.team ? student.team.teamName : 'Ingen hold'}</p>
        <button id="delete-button">Slet elev</button>
        <button id="show-courses-button">Vis kurser</button>
    `;
    const deleteButton = document.getElementById('delete-button');
    deleteButton.onclick = async() => {
        await deleteStudent(studentId);
        await loadStudents();
    }
    const showCoursesButton = document.getElementById('show-courses-button');
    showCoursesButton.onclick = async() => {
        await displayCoursesFromStudentId(student);
        await loadStudents();
    }
}

async function displayCoursesFromStudentId(student: any) {
    const courses = await getCoursesByStudent(student.studentID);
    studentHeaderElement.innerHTML = "Kurser";
    studentDetailsElement.innerHTML = `
        <p>Navn: ${student.studentName} ${student.studentLastName}</p>
        <p>Courses:</p>
    `;
    var noElementMessage:string = "Ingen kurser...";
    for (const item of courses) {
        noElementMessage = "";
        studentDetailsElement.innerHTML += `<p>${item.course.courseName}</p>`;
    }
    studentDetailsElement.innerHTML += `<p>${noElementMessage}</p>`;

    studentDetailsElement.innerHTML += `<button id="add-courses-button">Tilføj kurser</button>`;
    const addCourseButton = document.getElementById('add-courses-button');
    addCourseButton.onclick = async() =>{
        loadCoursesForStudent(student);
    }
}

async function loadCoursesForStudent(student:any) {
    const allCourses = await getAllCourses();
    studentDetailsElement.innerHTML = '';

    var courses:number[] = [];
    allCourses.forEach((course: {courseName: string, courseId: number}) => {
        const li = document.createElement('li');
        li.textContent = `${course.courseName}`;
        li.onclick = () => {
            courses.push(course.courseId); 
            li.classList.add('clicked');
            
        }
        studentDetailsElement.appendChild(li);
    });
    studentDetailsElement.innerHTML += `<button id="confirm-add-courses">Tilføj kurser</button>`;
    const confirmCourseAdd = document.getElementById('confirm-add-courses')
    confirmCourseAdd.onclick = async() => {
        if(courses != null){
            addCourse(student.studentId, courses);
        }
    }
}

async function addCourse(studentID: number, courseIds:number[]) {
    await addCourseToStudent(studentID, courseIds); 
}

async function addStudent() {
    const nameInput = document.getElementById('student-name') as HTMLInputElement;
    const teamIDInput = document.getElementById('student-team-id') as HTMLInputElement;
    const student = {
        studentName: nameInput.value.split(' ')[0],  
        studentLastName: nameInput.value.split(' ').slice(1).join(' '),  
        teamID: parseInt(teamIDInput.value),
    };
    try {
        console.log("Creating student with:", student);
        await createStudent(student);
        console.log("Student created successfully.");
        nameInput.value = '';
        teamIDInput.value = '';
        await loadStudents(); 
    } catch (error) {
        console.error("Error creating student:", error);
    }
}

(window as any).loadStudents = loadStudents;
(window as any).addStudent = addStudent;
(window as any).deleteStudent = deleteStudent;
(window as any).showStudentDetails = showStudentDetails;