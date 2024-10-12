var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getStudents, createStudent, deleteStudent } from '../services/api.js';
//elements
const studentListElement = document.getElementById('student-list');
const studentDetailsElement = document.getElementById('student-details');
const studentHeaderElement = document.getElementById('student-details-h2');
const contentArea = document.getElementById('content-area');
export function loadStudentView() {
    return __awaiter(this, void 0, void 0, function* () {
        const students = yield getStudents();
        loadStudents(students);
    });
}
function loadStudents(students) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
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
            const listItem = li;
            listItem.onclick = () => {
                studentItems.forEach(x => x.classList.remove('clicked'));
                listItem.classList.add('clicked');
                loadIndividualStudent(students[index]);
            };
        });
        (_a = document.getElementById('add-student-section-open')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            loadHTMLStudentAdd();
        });
    });
}
function loadIndividualStudent(student) {
    return __awaiter(this, void 0, void 0, function* () {
        contentArea.innerHTML = `
    <section>
        <p>Navn: ${student.studentName} ${student.studentLastName}</p>
        <p>Hold: ${student.team.teamName ? student.team.teamName : 'Ingen hold'}</p>

        <button id="delete-button">Slet elev</button>
    </section>
    `;
        const deleteButton = document.getElementById('delete-button');
        deleteButton.onclick = () => __awaiter(this, void 0, void 0, function* () {
            yield deleteStudent(student.studentID);
            yield loadStudents(yield getStudents());
        });
    });
}
function loadHTMLStudentAdd() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
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
        (_a = document.getElementById('add-student')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            const _studentName = document.getElementById('student-name').value;
            const _teamId = Number(document.getElementById('student-team-id').value);
            const student = {
                studentID: 0,
                studentName: _studentName.split(' ')[0],
                studentLastName: _studentName.split(' ').slice(1).join(' '),
                team: { teamID: _teamId, teamName: "" }
            };
            addStudent(student);
        });
    });
}
function addStudent(student) {
    return __awaiter(this, void 0, void 0, function* () {
        yield createStudent(student);
        yield loadStudents(yield getStudents());
        console.log("Student created successfully.");
    });
}
//# sourceMappingURL=studentView.js.map