var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_URL = 'https://studentwebapi.buchwaldshave34.dk/api';
export function getStudents() {
    return __awaiter(this, arguments, void 0, function* (includeRelations = false) {
        const response = yield fetch(`${API_URL}/Student/GetStudents?includeRelations=${includeRelations}`);
        return yield response.json();
    });
}
export function getStudent(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${API_URL}/Student/GetStudent/${id}`);
        return yield response.json();
    });
}
export function createStudent(student) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${API_URL}/Student/CreateStudent`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                studentName: student.studentName,
                studentLastName: student.studentLastName,
                teamID: student.team.teamID,
            }),
        });
        if (!response.ok) {
            const errorMessage = yield response.text();
            throw new Error(`Failed to create student: ${errorMessage}`);
        }
        return;
    });
}
export function updateStudent(id, updatedFields) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${API_URL}/Student/UpdateStudent/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/JSON' },
            body: JSON.stringify(updatedFields)
        });
        return yield response.json();
    });
}
export function deleteStudent(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(`${API_URL}/Student/DeleteStudent/${id}`, { method: 'DELETE' });
    });
}
export function getCoursesByStudent(studentId) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${API_URL}/StudentCourse/GetCoursesWithStudentID/${studentId}`);
        return yield response.json();
    });
}
export function addCourseToStudent(studentId, courseIds) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const item in courseIds) {
            const response = yield fetch(`${API_URL}/StudentCourse/CreateStudentCourse`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/JSON' },
                body: JSON.stringify({ studentId, item })
            });
        }
    });
}
export function getAllCourses() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${API_URL}/Course/GetCourses`);
        return yield response.json();
    });
}
export function updateStudentCourses(studentId, courseIds) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${API_URL}/StudentCourse/UpdateStudentCourse/${studentId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ courseIds })
        });
        return yield response.json();
    });
}
export function deleteStudentCourses(studentId, courseIds) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const id of courseIds) {
            try {
                const response = yield fetch(`${'URL'}/StudentCourse/DeleteStudentCourse/${studentId}/${id}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' }
                });
                if (!response.ok) {
                    console.error(`Failed to delete course with id ${id}:`, response.statusText);
                }
            }
            catch (error) {
                console.error(`Error deleting course with id ${id}:`, error);
            }
        }
    });
}
export function createTeam(team) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${API_URL}/Team/CreateTeam`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ team })
        });
        return yield response.json();
    });
}
export function updateteam(id, updatedFields) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${API_URL}/Team/UpdateTeam/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ updatedFields })
        });
        return yield response.json();
    });
}
//# sourceMappingURL=api.js.map