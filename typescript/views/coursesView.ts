import { Course, Student } from "../interfaces/mainPageModels.js";
import { addCourseToStudent, getAllCourses, getStudent, getStudents } from "../services/api.js";

const studentListElement = document.getElementById('student-list') as HTMLUListElement;
const studentDetailsElement = document.getElementById('student-details') as HTMLDivElement;
const studentHeaderElement = document.getElementById('student-details-h2') as any;
const contentArea = document.getElementById('content-area') as HTMLDivElement;

export async function loadCoursesView(){
    const courses: Course[] = await getAllCourses();
    displayAllCourses(courses);
}

async function displayAllCourses(courses: Course[]) {
    contentArea.innerHTML = `
        <section>
            <h2>Oversigt over alle kurser:</h2>
            <ul>
                ${courses.map(course => `<li>${course.courseName}</li>`).join('')}
            </ul>
            <button id='add-student-to-teams'>Tilføj elev til hold</button>
            </section>
    `;
    document.getElementById('add-student-to-teams')?.addEventListener('click', () => {
        chooseStudentToAdd(courses);
    });
}

async function chooseStudentToAdd(courses: Course[]) {
    const students: Student[] = await getStudents();
    let clickedStudent: Student | null = null; 

    contentArea.innerHTML = `
        <section>
            <h2>Vælg elev</h2>
            <ul>
                ${students.map((student: Student) => {
                    return `
                        <li class = "clicked-student">
                            ${student.studentName} ${student.studentLastName} - ${student.team.teamName}
                        </li>
                    `;
                }).join('')}
            </ul>
            <button id='submit'>Vælg elev</button>
        </section>
    `;

    const studentItems = document.querySelectorAll('ul li.clicked-student');

    studentItems.forEach((li, index) => {
        const listItem = li as HTMLLIElement; 

        listItem.onclick = () => {
            studentItems.forEach(x => (x as HTMLLIElement).classList.remove('clicked'));
            listItem.classList.add('clicked');
            clickedStudent = students[index]; 
        };
    });
    document.getElementById('submit')?.addEventListener('click', () => {
        if (clickedStudent) {
            addStudentToCourses(clickedStudent, courses);
        } else {
            console.log('No student selected');
        }
    });
}

async function addStudentToCourses(student:Student, courses: Course[]) {
    contentArea.innerHTML = `
        <section>
            <h2>Kurser:</h2>
            <ul>
                ${courses.map(course => `
                    <li class="course-item" data-course-id="${course.courseID}">
                        ${course.courseName}
                    </li>`).join('')}
            </ul>
            <button id='add-selected-student-to-teams'>Tilføj elev til hold</button>
            </section>
    `;

    let selectedCourses: number[] = [];
    //get courseids....

    const courseItems = document.querySelectorAll('.course-item');

    courseItems.forEach(item => {
        item.addEventListener('click', function() {
            const courseId = Number(this.getAttribute('data-course-id'));
            if(selectedCourses.includes(courseId)){
                selectedCourses = selectedCourses.filter(id => id !== courseId);
                this.classList.remove('selected');
            }
            else{
                selectedCourses.push(courseId);
                this.classList.add('selected');
            }
        });
    });
    document.getElementById('add-selected-student-to-teams')?.addEventListener('click', () =>{
        if(selectedCourses.length > 0){
            addCourseToStudent(student.studentID, selectedCourses);
            displayAllCourses(courses);
        }
        else{
            console.log('ingen kurser valgt');
        }
    });
}