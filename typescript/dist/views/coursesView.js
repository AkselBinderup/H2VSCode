var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { addCourseToStudent, getAllCourses, getStudents } from "../services/api.js";
const studentListElement = document.getElementById('student-list');
const studentDetailsElement = document.getElementById('student-details');
const studentHeaderElement = document.getElementById('student-details-h2');
const contentArea = document.getElementById('content-area');
export function loadCoursesView() {
    return __awaiter(this, void 0, void 0, function* () {
        const courses = yield getAllCourses();
        displayAllCourses(courses);
    });
}
function displayAllCourses(courses) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        contentArea.innerHTML = `
        <section>
            <h2>Oversigt over alle kurser:</h2>
            <ul>
                ${courses.map(course => `<li>${course.courseName}</li>`).join('')}
            </ul>
            <button id='add-student-to-teams'>Tilføj elev til hold</button>
            </section>
    `;
        (_a = document.getElementById('add-student-to-teams')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            chooseStudentToAdd(courses);
        });
    });
}
function chooseStudentToAdd(courses) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const students = yield getStudents();
        let clickedStudent = null;
        contentArea.innerHTML = `
        <section>
            <h2>Vælg elev</h2>
            <ul>
                ${students.map((student) => {
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
            const listItem = li;
            listItem.onclick = () => {
                studentItems.forEach(x => x.classList.remove('clicked'));
                listItem.classList.add('clicked');
                clickedStudent = students[index];
            };
        });
        (_a = document.getElementById('submit')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            if (clickedStudent) {
                addStudentToCourses(clickedStudent, courses);
            }
            else {
                console.log('No student selected');
            }
        });
    });
}
function addStudentToCourses(student, courses) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
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
        let selectedCourses = [];
        //get courseids....
        const courseItems = document.querySelectorAll('.course-item');
        courseItems.forEach(item => {
            item.addEventListener('click', function () {
                const courseId = Number(this.getAttribute('data-course-id'));
                if (selectedCourses.includes(courseId)) {
                    selectedCourses = selectedCourses.filter(id => id !== courseId);
                    this.classList.remove('selected');
                }
                else {
                    selectedCourses.push(courseId);
                    this.classList.add('selected');
                }
            });
        });
        (_a = document.getElementById('add-selected-student-to-teams')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            if (selectedCourses.length > 0) {
                addCourseToStudent(student.studentID, selectedCourses);
            }
            else {
                console.log('ingen kurser valgt');
            }
        });
    });
}
//# sourceMappingURL=coursesView.js.map