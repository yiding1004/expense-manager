import { Component } from '@angular/core';
import { Expense } from './interfaces/user.interface';
import { ExpenseDataService } from './expense-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  expenses!: Expense[];
  constructor(private expenseDataService: ExpenseDataService) {
    this.expenseDataService.expensesEmittor.subscribe((data) => {
      this.expenses = data;
    });
  }
}
