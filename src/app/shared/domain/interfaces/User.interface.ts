import { Course } from "./Course.interface";

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  createdAt?: string;
  updatedAt?: string;
  partnerId?: number;
  phone?: string;
  token: string;
  address?: string;
  status: string;
  skills?: Skill[];
  studentNumber?: string;
  course?: Course;
}

export interface Role {
  id: number;
  name: string;
}

export interface Partners {
  id: number;
  name: string;
  color?: string;
}

export interface UserRegister extends Partial<User> {
  password: string;
  roleId: number;
  address?: string;
}

export interface Skill {
  id: number;
  name: string;
  description?: string;
}
