import { Student } from "../interfaces/mainPageModels.js";
import { getStudents, createStudent, deleteStudent, getStudent, getCoursesByStudent, getAllCourses, addCourseToStudent } from '../services/api.js';

//elements
const studentListElement = document.getElementById('student-list') as HTMLUListElement;
const studentDetailsElement = document.getElementById('student-details') as HTMLDivElement;
const studentHeaderElement = document.getElementById('student-details-h2') as any;
const contentArea = document.getElementById('content-area') as HTMLDivElement;

export async function loadStudentView(){
    const students: Student[] = await getStudents();
    loadStudents(students);
} 
async function loadStudents(students: Student[]) {
    contentArea.innerHTML = `
    <section>
        <h2>Elever:</h2> 
        <ul>
            ${students.map(student => `<li class="non-clicked-li">${student.studentName} ${student.studentLastName}</li>`).join('')}
        </ul>
        <button id="add-student-section-open">Tilføj elev</button>
    </section>
    `;
    const studentItems = document.querySelectorAll('ul li.non-clicked-li');

    studentItems.forEach((li, index) => {
        const listItem = li as HTMLLIElement;

        listItem.onclick  = () => {
            studentItems.forEach(x => (x as HTMLLIElement). classList.remove('clicked'));
            listItem.classList.add('clicked');
            loadIndividualStudent(students[index]);
        }
    });

    document.getElementById('add-student-section-open')?.addEventListener('click', () => {
        loadHTMLStudentAdd();
    });
}

async function loadIndividualStudent(student: Student) {
    contentArea.innerHTML = `
    <section>
        <p>Navn: ${student.studentName} ${student.studentLastName}</p>
        <p>Hold: ${student.team.teamName? student.team.teamName : 'Ingen hold'}</p>
        <button id="delete-button">Slet elev</button>
    </section>
    `
    const deleteButton = document.getElementById('delete-button');
    deleteButton.onclick = async() =>{
        await deleteStudent(student.studentID);
        await loadStudents(await getStudents());
    }
}

async function loadHTMLStudentAdd() {
    contentArea.innerHTML = `
    <section id="add-student-section">
        <h2>Tilføj elev</h2>
        <form id="add-student-form">
            <input type="text" id="student-name" placeholder="Navn" required />
            <input type="number" id="student-team-id" placeholder="Hold ID" required />
            <button type="button" id="add-student">Tilføj elev</button>
        </form>
    </section>
    `;

    document.getElementById('add-student')?.addEventListener('click', () => {
        const _studentName = (document.getElementById('student-name') as HTMLInputElement).value;
        const _teamId = Number((document.getElementById('student-team-id') as HTMLInputElement).value);
    
        const student: Student = {
            studentID: 0,
            studentName: _studentName.split(' ')[0],  
            studentLastName: _studentName.split(' ').slice(1).join(' '), 
            team: {teamID: _teamId, teamName: ""}
        };
        addStudent(student);
    });
}

async function addStudent(student:Student) {
    await createStudent(student);
    await loadStudents(await getStudents());
    console.log("Student created successfully.");
}