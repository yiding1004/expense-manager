import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Expense, User } from '../interfaces/user.interface';
import { ExampleDataSource } from '../interfaces/dataSource.interface';
import { ExpenseDataService } from '../expense-data.service';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnChanges {
  @Input() expenses!: Expense[];
  users!: User[];
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'totalExpense',
    'actions',
  ];
  dataSource!: ExampleDataSource;

  constructor(
    public dialog: MatDialog,
    private expenseDataService: ExpenseDataService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['expenses']) {
      this.users = this.expenseDataService.getEachUserExpenses(this.expenses);
      this.dataSource = new ExampleDataSource(this.users);
    }
  }

  openDialog(user: User) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  removeData(employeeId: string) {
    this.expenseDataService.deleteUserbyemployeeId(employeeId);
  }
}
