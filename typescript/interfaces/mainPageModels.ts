export class Team {
    teamId: number;
    teamName: string;
}

export class Student{
    studentID: number;
    studentName: string;
    studentLastName: string;
    team: {teamID: number, teamName: string};
}

export class Course{
    courseName: string;
    courseID: number;
}