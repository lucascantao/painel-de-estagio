import { Company } from "./Company.interface";
import { Course } from "./Course.interface";
import { Role } from "./User.interface";

export interface Internship {
  id: number;
  workload: string,
  schedule: string,
  startDate: string,
  endDate: string,
  salary: number,
  observation: string,
  supervisor: string,
  company: Company,
  status: InternshipStatus,
  user: Student;
}

export interface Student {
  id: number,
  name: string,
  email: string,
  phone?: string,
  studentNumber?: string,
  course: Course
}

export interface InternshipStatus {
  id: number;
  name: string;
  description: string;
  textColor: string;
  backgroundColor: string;
}
