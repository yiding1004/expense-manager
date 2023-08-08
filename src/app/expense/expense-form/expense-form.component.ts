import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ExpenseDataService } from 'src/app/expense-data.service';
import {
  CATEGORIES,
  DecentExpense,
  Expense,
  FullNameDetails,
} from 'src/app/interfaces/user.interface';
import { UserFormComponent } from 'src/app/user/user-form/user-form.component';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss'],
})
export class ExpenseFormComponent implements OnInit, OnDestroy {
  expenseForm!: FormGroup;
  categories = CATEGORIES;
  fullNamesDetails!: FullNameDetails[];
  private subscription: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public decentExpense: DecentExpense,
    private dialogRef: MatDialogRef<UserFormComponent>,
    private formBuilder: FormBuilder,
    private expenseDataService: ExpenseDataService
  ) {
    this.subscription = this.expenseDataService.expensesData$.subscribe(
      (expenses: Expense[]) => {
        this.fullNamesDetails = this.expenseDataService.getAllFullNames(expenses);
      }
    );
  }

  ngOnInit(): void {
    this.expenseForm = this.formBuilder.group({
      fullName: new FormControl(this.decentExpense.fullName, [
        Validators.required,
      ]),
      category: new FormControl(this.decentExpense.category, [
        Validators.required,
      ]),
      cost: new FormControl(this.decentExpense.cost, [Validators.required]),
      description: new FormControl(this.decentExpense.description, [
        Validators.required,
      ]),
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  updateExpenseById(id: number) {
    const fullName = this.expenseForm.get('fullName')?.value;
    const category = this.expenseForm.get('category')?.value;
    const cost = this.expenseForm.get('cost')?.value;
    const description = this.expenseForm.get('description')?.value;
    const noUpdate =
      fullName === this.decentExpense.fullName &&
      category === this.decentExpense.category &&
      cost === this.decentExpense.cost &&
      description === this.decentExpense.description;
    if (noUpdate) {
      this.closeDialog();
      return;
    }
    const newExpense: Expense = {
      id: id,
      employeeId: this.decentExpense.employeeId,
      firstName: fullName.split(' ')[0],
      lastName: fullName.split(' ')[1],
      category: category,
      cost: cost,
      description: description,
    };
    this.expenseDataService.updateExpense(newExpense);
    this.closeDialog();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
