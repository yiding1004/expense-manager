import { Injectable } from '@angular/core';
import {
  Category,
  CompanyExpense,
  DecentExpense,
  Expense,
  FullNameDetails,
  User,
} from './interfaces/user.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { EXPENSE_DATA } from './mock-data';

const expensesData = EXPENSE_DATA;

@Injectable({
  providedIn: 'root',
})
export class ExpenseDataService {
  expensesEmittor = new BehaviorSubject(expensesData);
  expensesData$: Observable<any> = this.expensesEmittor.asObservable();

  constructor() {}

  getEachUserExpenses(expenses: Expense[]): User[] {
    const result = Array.from(
      expenses
        .reduce((acc, expense) => {
          const { employeeId, firstName, lastName, cost } = expense;
          const existingEmployee = acc.get(employeeId);
          if (existingEmployee) {
            existingEmployee.totalExpense += cost || 0;
          } else {
            acc.set(employeeId, {
              firstName,
              lastName,
              employeeId,
              totalExpense: cost || 0,
            });
          }
          return acc;
        }, new Map())
        .values()
    );
    return result;
  }

  deleteUserbyemployeeId(employeeId: string) {
    let updatedExpenses = this.expensesEmittor.getValue().filter((el) => {
      return el.employeeId !== employeeId;
    });
    this.expensesEmittor.next(updatedExpenses);
  }

  updateUserName(user: User, newUser: User) {
    const updatedExpenses = this.expensesEmittor.getValue().map((expense) => {
      if (
        expense.firstName === user.firstName &&
        expense.lastName === user.lastName
      ) {
        return {
          ...expense,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
        };
      }
      return expense;
    });
    this.expensesEmittor.next(updatedExpenses);
    console.log('updatedData: ' + JSON.stringify(updatedExpenses));
  }

  getExpensesLength() {
    return Math.max(
      EXPENSE_DATA.length,
      this.expensesEmittor.getValue().length
    );
  }

  addNewUser(newUser: User) {
    const newExpense = {
      id: this.getExpensesLength() + 1,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      employeeId: newUser.employeeId,
    };
    this.addNewExpense(newExpense);
  }

  addNewExpense(newExpense: Expense) {
    const updatedExpenses = this.expensesEmittor.getValue().concat(newExpense);
    this.expensesEmittor.next(updatedExpenses);
  }

  getDecentExpenses(expenses: Expense[]): DecentExpense[] {
    const decentExpenses = expenses
      .filter((e) => 'cost' in e)
      .map((expense) => {
        const fullName = `${expense.firstName} ${expense.lastName}`;
        const { id, employeeId, category, description, cost } = expense;
        return { id, fullName, employeeId, category, description, cost };
      });
    return decentExpenses;
  }

  deleteExpense(decentExpense: DecentExpense) {
    const updatedExpenses = this.expensesEmittor
      .getValue()
      .filter((el) => el.id !== decentExpense.id);
    this.expensesEmittor.next(updatedExpenses);
  }

  getAllFullNames(expenses: Expense[]): FullNameDetails[] {
    const fullNameDetails: FullNameDetails[] = [];
    const employeeIds: string[] = [];
    expenses.forEach(expense => {
      if (!employeeIds.includes(expense.employeeId)) {
        fullNameDetails.push({
          fullName: `${expense.firstName} ${expense.lastName}`,
          employeeId: expense.employeeId
        });
        employeeIds.push(expense.employeeId);
      }
    });
    return fullNameDetails;
  }

  updateExpense(expense: Expense) {
    const updatedExpenses = this.expensesEmittor.getValue().map((el) => {
      if (el.id === expense.id) return expense;
      else return el;
    });
    this.expensesEmittor.next(updatedExpenses);
  }

  getCompanyExpenses(expenses: Expense[]): CompanyExpense[] {
    const categoryTotalMap = new Map<Category, number>();

    expenses
      .filter((e) => 'cost' in e)
      .forEach((expense) => {
        const { category, cost } = expense;
        const currentTotal = (category && categoryTotalMap.get(category)) || 0;
        categoryTotalMap.set(category!, currentTotal + cost!);
      });

    const result: CompanyExpense[] = [];
    categoryTotalMap.forEach((total, category) => {
      result.push({ category, total });
    });

    return result;
  }
}
