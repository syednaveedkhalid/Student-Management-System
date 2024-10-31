#! /usr/bin/env node
class Course {
    name;
    fee;
    constructor(name, fee) {
        this.name = name;
        this.fee = fee;
    }
}
class Student {
    static idCounter = 10000; // Start ID from 10000
    studentID;
    name;
    courses = [];
    balance = 0;
    constructor(name) {
        this.studentID = Student.generateStudentID();
        this.name = name;
    }
    static generateStudentID() {
        return this.idCounter++;
    }
    enroll(course) {
        this.courses.push(course);
        this.balance += course.fee;
    }
    viewBalance() {
        return this.balance;
    }
    payFees(amount) {
        if (amount > this.balance) {
            console.log("Amount exceeds balance. Payment unsuccessful.");
        }
        else {
            this.balance -= amount;
            console.log(`Payment of ${amount} successful. Remaining balance: ${this.balance}`);
        }
    }
    showStatus() {
        console.log(`Name: ${this.name}`);
        console.log(`ID: ${this.studentID}`);
        console.log(`Enrolled Courses: ${this.courses.map(course => course.name).join(", ")}`);
        console.log(`Balance: ${this.balance}`);
    }
}
class School {
    students = [];
    addStudent(name) {
        const newStudent = new Student(name);
        this.students.push(newStudent);
        console.log(`Student ${name} added with ID ${newStudent.studentID}`);
        return newStudent;
    }
    findStudentByID(id) {
        return this.students.find(student => student.studentID === id);
    }
}
// Create courses
const math = new Course("Typscript", 5000);
const science = new Course("Blockchain", 6000);
// Initialize School
const mySchool = new School();
// Add a student
const student1 = mySchool.addStudent("Naveed, Hamza, Ali, Taha");
// Enroll the student in courses
student1.enroll(math);
student1.enroll(science);
// View student balance
console.log(`Balance for ${student1.name}: ${student1.viewBalance()}`);
// Pay fees
student1.payFees(300); // Partial payment
student1.payFees(800); // Complete payment
// Show student status
student1.showStatus();
export {};
