import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DecentExpense, Expense } from '../interfaces/user.interface';
import { ExampleDataSource } from '../interfaces/dataSource.interface';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseDataService } from '../expense-data.service';
import { ExpenseFormComponent } from './expense-form/expense-form.component';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent implements OnChanges {
  @Input() expenses!: Expense[];
  decentExpense!: DecentExpense[];
  displayedColumns: string[] = [
    'fullName',
    'category',
    'description',
    'cost',
    'actions',
  ];
  dataSource!: ExampleDataSource;

  constructor(
    public dialog: MatDialog,
    private expenseDataService: ExpenseDataService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['expenses']) {
      this.decentExpense = this.expenseDataService.getDecentExpenses(
        this.expenses
      );
      this.dataSource = new ExampleDataSource(this.decentExpense);
    }
  }

  openDialog(decentExpense: DecentExpense) {
    const dialogRef = this.dialog.open(ExpenseFormComponent, {
      data: decentExpense,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  removeData(decentExpense: DecentExpense) {
    this.expenseDataService.deleteExpense(decentExpense);
  }
}
