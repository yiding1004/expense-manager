export interface User {
  firstName: string;
  lastName: string;
  employeeId: string;
  totalExpense?: number;
}

export interface Expense {
  id: number;
  firstName: string;
  lastName: string;
  employeeId: string;
  category?: Category;
  description?: string;
  cost?: number;
}

export interface DecentExpense {
  id: number;
  fullName: string;
  employeeId: string;
  category?: Category;
  description?: string;
  cost?: number;
}

export interface FullNameDetails {
  fullName: string;
  employeeId: string;
}

export interface CompanyExpense {
  category: Category;
  total: number;
}

export enum Category {
  FOOD = 'FOOD',
  TRAVEL = 'TRAVEL',
  EQUIPMENT = 'EQUIPMENT',
}

export const CATEGORIES: Category[] = [
  Category.EQUIPMENT,
  Category.FOOD,
  Category.TRAVEL,
];
