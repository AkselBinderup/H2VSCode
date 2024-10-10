var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getStudents, createStudent, deleteStudent, getStudent, getCoursesByStudent, getAllCourses, addCourseToStudent } from './services/api.js';
const studentListElement = document.getElementById('student-list');
const studentDetailsElement = document.getElementById('student-details');
const studentHeaderElement = document.getElementById('student-details-h2');
function loadStudents() {
    return __awaiter(this, void 0, void 0, function* () {
        const students = yield getStudents();
        studentListElement.innerHTML = '';
        students.forEach((student) => {
            const li = document.createElement('li');
            li.textContent = `${student.studentName} ${student.studentLastName} - Hold: ${student.team ? student.team.teamName : 'No team'}`;
            li.onclick = () => showStudentDetails(student.studentID);
            studentListElement.appendChild(li);
        });
    });
}
function showStudentDetails(studentId) {
    return __awaiter(this, void 0, void 0, function* () {
        const student = yield getStudent(studentId);
        studentDetailsElement.innerHTML = `
        <p>Navn: ${student.studentName} ${student.studentLastName}</p>
        <p>Hold: ${student.team ? student.team.teamName : 'Ingen hold'}</p>
        <button id="delete-button">Slet elev</button>
        <button id="show-courses-button">Vis kurser</button>
    `;
        const deleteButton = document.getElementById('delete-button');
        deleteButton.onclick = () => __awaiter(this, void 0, void 0, function* () {
            yield deleteStudent(studentId);
            yield loadStudents();
        });
        const showCoursesButton = document.getElementById('show-courses-button');
        showCoursesButton.onclick = () => __awaiter(this, void 0, void 0, function* () {
            yield displayCoursesFromStudentId(student);
            yield loadStudents();
        });
    });
}
function displayCoursesFromStudentId(student) {
    return __awaiter(this, void 0, void 0, function* () {
        const courses = yield getCoursesByStudent(student.studentID);
        studentHeaderElement.innerHTML = "Kurser";
        studentDetailsElement.innerHTML = `
        <p>Navn: ${student.studentName} ${student.studentLastName}</p>
        <p>Courses:</p>
    `;
        var noElementMessage = "Ingen kurser...";
        for (const item of courses) {
            noElementMessage = "";
            studentDetailsElement.innerHTML += `<p>${item.course.courseName}</p>`;
        }
        studentDetailsElement.innerHTML += `<p>${noElementMessage}</p>`;
        studentDetailsElement.innerHTML += `<button id="add-courses-button">Tilføj kurser</button>`;
        const addCourseButton = document.getElementById('add-courses-button');
        addCourseButton.onclick = () => __awaiter(this, void 0, void 0, function* () {
            loadCoursesForStudent(student);
        });
    });
}
function loadCoursesForStudent(student) {
    return __awaiter(this, void 0, void 0, function* () {
        const allCourses = yield getAllCourses();
        studentDetailsElement.innerHTML = '';
        var courses = [];
        allCourses.forEach((course) => {
            const li = document.createElement('li');
            li.textContent = `${course.courseName}`;
            li.onclick = () => {
                courses.push(course.courseId);
                li.classList.add('clicked');
            };
            studentDetailsElement.appendChild(li);
        });
        studentDetailsElement.innerHTML += `<button id="confirm-add-courses">Tilføj kurser</button>`;
        const confirmCourseAdd = document.getElementById('confirm-add-courses');
        confirmCourseAdd.onclick = () => __awaiter(this, void 0, void 0, function* () {
            if (courses != null) {
                addCourse(student.studentId, courses);
            }
        });
    });
}
function addCourse(studentID, courseIds) {
    return __awaiter(this, void 0, void 0, function* () {
        yield addCourseToStudent(studentID, courseIds);
    });
}
function addStudent() {
    return __awaiter(this, void 0, void 0, function* () {
        const nameInput = document.getElementById('student-name');
        const teamIDInput = document.getElementById('student-team-id');
        const student = {
            studentName: nameInput.value.split(' ')[0],
            studentLastName: nameInput.value.split(' ').slice(1).join(' '),
            teamID: parseInt(teamIDInput.value),
        };
        try {
            console.log("Creating student with:", student);
            yield createStudent(student);
            console.log("Student created successfully.");
            nameInput.value = '';
            teamIDInput.value = '';
            yield loadStudents();
        }
        catch (error) {
            console.error("Error creating student:", error);
        }
    });
}
window.loadStudents = loadStudents;
window.addStudent = addStudent;
window.deleteStudent = deleteStudent;
window.showStudentDetails = showStudentDetails;
