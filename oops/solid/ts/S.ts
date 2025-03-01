
// Single Responsibility Principle

// following class violates the Single Responsibility Principle
class Student {
    public createStudentAccount() {
        // some logic
    }

    public calculateStudentGrade() {
        // some logic
    }

    public generateStudentData() {
        // some logic
    }
}

// Refactored code
class StudentAccount {
    public createStudentAccount() {
        // some logic
    }

    // other methods related to student account
}

class StudentGrade {
    public calculateStudentGrade() {
        // some logic
    }

    // other methods related to student grade
}

class StudentData {
    public generateStudentData() {
        // some logic
    }

    // other methods related to student data
}