#! /usr/bin/env node
import inquirer from "inquirer";

class Course {
    public name: string;
    public fee: number;

    constructor(name: string, fee: number) {
        this.name = name;
        this.fee = fee;
    }
}

class Student {
    private static idCounter: number = 10000; // Start ID from 10000
    public studentID: number;
    public name: string;
    private courses: Course[] = [];
    private balance: number = 0;

    constructor(name: string) {
        this.studentID = Student.generateStudentID();
        this.name = name;
    }

    private static generateStudentID(): number {
        return this.idCounter++;
    }

    public enroll(course: Course): void {
        this.courses.push(course);
        this.balance += course.fee;
    }

    public viewBalance(): number {
        return this.balance;
    }

    public payFees(amount: number): void {
        if (amount > this.balance) {
            console.log("Amount exceeds balance. Payment unsuccessful.");
        } else {
            this.balance -= amount;
            console.log(`Payment of ${amount} successful. Remaining balance: ${this.balance}`);
        }
    }

    public showStatus(): void {
        console.log(`Name: ${this.name}`);
        console.log(`ID: ${this.studentID}`);
        console.log(`Enrolled Courses: ${this.courses.map(course => course.name).join(", ")}`);
        console.log(`Balance: ${this.balance}`);
    }
}

class School {
    private students: Student[] = [];

    public addStudent(name: string): Student {
        const newStudent = new Student(name);
        this.students.push(newStudent);
        console.log(`Student ${name} added with ID ${newStudent.studentID}`);
        return newStudent;
    }

    public findStudentByID(id: number): Student | undefined {
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
student1.showStatus()
