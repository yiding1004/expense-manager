import { Category, CompanyExpense } from 'src/app/interfaces/user.interface';
import { Component, Input, SimpleChanges } from '@angular/core';
import { Expense } from '../interfaces/user.interface';
import { ExampleDataSource } from '../interfaces/dataSource.interface';
import { ExpenseDataService } from '../expense-data.service';

@Component({
  selector: 'app-company-expenses',
  templateUrl: './company-expenses.component.html',
  styleUrls: ['./company-expenses.component.scss'],
})
export class CompanyExpensesComponent {
  @Input() expenses!: Expense[];
  companyExpenses!: CompanyExpense[];
  displayedColumns: string[] = ['category', 'total'];
  dataSource!: ExampleDataSource;

  constructor(private expenseDataService: ExpenseDataService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['expenses']) {
      this.companyExpenses = this.expenseDataService.getCompanyExpenses(
        this.expenses
      );
      this.dataSource = new ExampleDataSource(this.companyExpenses);
    }
  }
}
